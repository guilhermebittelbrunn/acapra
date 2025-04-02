import { Inject, Injectable } from '@nestjs/common';

import { UpdateAnimalDTO } from './dto/updateAnimal.dto';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalBreed from '@/module/animal/domain/animal/animalBreed.domain';
import AnimalGender from '@/module/animal/domain/animal/animalGender.domain';
import AnimalSize from '@/module/animal/domain/animal/animalSize.domain';
import AnimalStatus from '@/module/animal/domain/animal/animalStatus.domain';
import Specie from '@/module/animal/domain/specie.domain';
import Publication from '@/module/association/domain/publication.domain';
import { AddTagToAnimalService } from '@/module/association/domain/tag/services/addTagToAnimal/addTagToAnimal.service';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce, filledArray } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateAnimalService {
  constructor(
    @Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository,
    @Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository,
    @Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository,
    private readonly addTagToAnimal: AddTagToAnimalService,
  ) {}

  async execute(dto: UpdateAnimalDTO) {
    const validatedFieldsOrError = await this.validateAndFetchFields(dto);
    if (validatedFieldsOrError instanceof GenericAppError) {
      return validatedFieldsOrError;
    }

    const buildedEntitiesOrError = this.buildEntities(dto);
    if (buildedEntitiesOrError instanceof GenericAppError) {
      return buildedEntitiesOrError;
    }

    const { status, breed, size, gender } = buildedEntitiesOrError;
    const { specie, publication, animal } = validatedFieldsOrError;

    const animalOrError = Animal.create(
      {
        ...dto,
        specieId: coalesce(specie?.id, animal.specieId),
        publicationId: publication?.id,
        associationId: animal.associationId,
        status: coalesce(status, animal.status),
        breed: coalesce(breed, animal.breed),
        size: coalesce(size, animal.size),
        gender: coalesce(gender, animal.gender),
        name: coalesce(dto.name, animal.name),
        age: coalesce(dto.age, animal.age),
      },
      animal.id,
    );

    if (animalOrError instanceof GenericAppError) {
      return animalOrError;
    }

    if (filledArray(dto.tagsIds)) {
      await this.addTagToAnimal.execute(animalOrError, dto.tagsIds);
    }

    return this.animalRepo.update(animalOrError);
  }

  private async validateAndFetchFields(dto: UpdateAnimalDTO) {
    let specieEntity: Specie | undefined;
    let publicationEntity: Publication | undefined;

    const animal = await this.animalRepo.findById(dto.id);

    if (!animal) {
      return new GenericErrors.NotFound(`Animal com id ${dto.id} não encontrado`);
    }

    if (dto.specieId) {
      const specie = await this.specieRepo.findById(dto.specieId);
      if (!specie) {
        return new GenericErrors.NotFound(`Espécie com id ${dto.specieId} não encontrada`);
      }
      specieEntity = specie;
    }

    if (dto.publicationId) {
      const publication = await this.publicationRepo.findById(dto.publicationId);
      if (!publication) {
        return new GenericErrors.NotFound(`Publicação com id ${dto.publicationId} não encontrada`);
      }
      publicationEntity = publication;
    }

    return { specie: specieEntity, publication: publicationEntity, animal };
  }

  private buildEntities(dto: UpdateAnimalDTO) {
    let gender: AnimalGender | undefined;
    let status: AnimalStatus | undefined;
    let breed: AnimalBreed | undefined;
    let size: AnimalSize | undefined;

    if (dto.gender) {
      const genderOrError = AnimalGender.create(dto.gender);
      if (genderOrError instanceof GenericAppError) {
        return genderOrError;
      }

      gender = genderOrError;
    }

    if (dto.status) {
      const statusOrError = AnimalStatus.create(dto.status);
      if (statusOrError instanceof GenericAppError) {
        return statusOrError;
      }

      status = statusOrError;
    }

    if (dto.breed) {
      const breedOrError = AnimalBreed.create(dto.breed);
      if (breedOrError instanceof GenericAppError) {
        return breedOrError;
      }

      breed = breedOrError;
    }

    if (dto.size) {
      const sizeOrError = AnimalSize.create(dto.size);
      if (sizeOrError instanceof GenericAppError) {
        return sizeOrError;
      }

      size = sizeOrError;
    }

    return { gender, status, breed, size };
  }
}
