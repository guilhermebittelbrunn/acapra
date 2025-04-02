import { Inject, Injectable } from '@nestjs/common';

import { CreateAnimalDTO } from './dto/createAnimal.dto';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalBreed from '@/module/animal/domain/animal/animalBreed.domain';
import AnimalGender from '@/module/animal/domain/animal/animalGender.domain';
import AnimalSize from '@/module/animal/domain/animal/animalSize.domain';
import { AddTagToAnimalService } from '@/module/association/domain/tag/services/addTagToAnimal/addTagToAnimal.service';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class CreateAnimalService {
  constructor(
    @Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository,
    @Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository,
    @Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository,
    private readonly addTagToAnimal: AddTagToAnimalService,
  ) {}

  async execute(dto: CreateAnimalDTO) {
    const validatedFields = await this.validateFields(dto);
    if (validatedFields instanceof GenericAppError) {
      return validatedFields;
    }

    const entitiesOrError = this.buildEntities(dto);
    if (entitiesOrError instanceof GenericAppError) {
      return entitiesOrError;
    }

    const animalOrError = Animal.create({
      ...dto,
      ...entitiesOrError,
      associationId: new UniqueEntityID(dto.associationId),
      specieId: new UniqueEntityID(dto.specieId),
      publicationId: UniqueEntityID.createOrUndefined(dto.publicationId),
    });

    if (animalOrError instanceof GenericAppError) {
      return animalOrError;
    }

    const animalRaw = await this.animalRepo.create(animalOrError);

    if (filledArray(dto.tagsIds)) {
      await this.addTagToAnimal.execute(animalRaw, dto.tagsIds);
    }

    return animalRaw;
  }

  private async validateFields(dto: CreateAnimalDTO) {
    const specie = await this.specieRepo.findById(dto.specieId);
    if (!specie) {
      return new GenericErrors.NotFound(`Espécie com id ${dto.specieId} não encontrada`);
    }

    if (dto.publicationId) {
      const publication = await this.publicationRepo.findById(dto.publicationId);
      if (!publication) {
        return new GenericErrors.NotFound(`Publicação com id ${dto.publicationId} não encontrada`);
      }
    }
  }

  private buildEntities(dto: CreateAnimalDTO) {
    const genderOrError = AnimalGender.create(dto.gender);
    if (genderOrError instanceof GenericAppError) {
      return genderOrError;
    }

    const breedOrError = AnimalBreed.create(dto.breed);
    if (breedOrError instanceof GenericAppError) {
      return breedOrError;
    }

    const sizeOrError = AnimalSize.create(dto.size);
    if (sizeOrError instanceof GenericAppError) {
      return sizeOrError;
    }

    return { gender: genderOrError, breed: breedOrError, size: sizeOrError };
  }
}
