import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateAnimalDTO } from './dto/createAnimal.dto';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalBreed from '@/module/animal/domain/animal/animalBreed.domain';
import AnimalGender from '@/module/animal/domain/animal/animalGender.domain';
import AnimalSize from '@/module/animal/domain/animal/animalSize.domain';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class CreateAnimalService {
  constructor(
    @Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository,
    @Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository,
    @Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository,
  ) {}

  async execute(dto: CreateAnimalDTO) {
    await this.validateFields(dto);

    const animalOrError = Animal.create({
      ...dto,
      ...this.buildEntities(dto),
      associationId: new UniqueEntityID(dto.associationId),
      specieId: new UniqueEntityID(dto.specieId),
      publicationId: UniqueEntityID.createOrUndefined(dto.publicationId),
    });

    if (animalOrError instanceof GenericAppError) {
      throw new GenericException(animalOrError);
    }

    const animal = await this.animalRepo.create(animalOrError);

    return animal;
  }

  private async validateFields(dto: CreateAnimalDTO) {
    const specie = await this.specieRepo.findById(dto.specieId);

    if (!specie) {
      throw new GenericException(`Espécie com id ${dto.specieId} não encontrada`, HttpStatus.NOT_FOUND);
    }

    if (dto.publicationId) {
      const publication = await this.publicationRepo.findById(dto.publicationId);

      if (!publication) {
        throw new GenericException(
          `Publicação com id ${dto.publicationId} não encontrada`,
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  private buildEntities(dto: CreateAnimalDTO) {
    const genderOrError = AnimalGender.create(dto.gender);

    if (genderOrError instanceof GenericAppError) {
      throw new GenericException(genderOrError);
    }

    const breedOrError = AnimalBreed.create(dto.breed);

    if (breedOrError instanceof GenericAppError) {
      throw new GenericException(breedOrError);
    }

    const sizeOrError = AnimalSize.create(dto.size);

    if (sizeOrError instanceof GenericAppError) {
      throw new GenericException(sizeOrError);
    }

    return { gender: genderOrError, breed: breedOrError, size: sizeOrError };
  }
}
