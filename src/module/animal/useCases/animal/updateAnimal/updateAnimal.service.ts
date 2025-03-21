import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UpdateAnimalDTO } from './dto/updateAnimal.dto';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalBreed from '@/module/animal/domain/animal/animalBreed.domain';
import AnimalGender from '@/module/animal/domain/animal/animalGender.domain';
import AnimalStatus from '@/module/animal/domain/animal/animalStatus.domain';
import Specie from '@/module/animal/domain/specie.domain';
import Publication from '@/module/association/domain/publication.domain';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateAnimalService {
  constructor(
    @Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository,
    @Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository,
    @Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository,
  ) {}

  async execute(dto: UpdateAnimalDTO) {
    const { specie, publication, animal } = await this.validateAndFetchFields(dto);

    const { gender, status, breed } = this.buildEntities(dto);

    const animalOrError = Animal.create(
      {
        ...dto,
        specieId: coalesce(specie?.id, animal.specieId),
        publicationId: publication?.id,
        associationId: animal.associationId,
        status: coalesce(status, animal.status),
        breed: coalesce(breed, animal.breed),
        gender: coalesce(gender, animal.gender),
        name: coalesce(dto.name, animal.name),
        age: coalesce(dto.age, animal.age),
        weight: coalesce(dto.weight, animal.weight),
      },
      animal.id,
    );

    if (animalOrError instanceof GenericAppError) {
      throw new GenericException(animalOrError);
    }

    const rawId = await this.animalRepo.update(animalOrError);

    return rawId;
  }

  private async validateAndFetchFields(dto: UpdateAnimalDTO) {
    let specieEntity: Specie | undefined;
    let publicationEntity: Publication | undefined;

    const animal = await this.animalRepo.findById(dto.id);

    if (!animal) {
      throw new GenericException(`Animal com id ${dto.id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    if (dto.specieId) {
      const specie = await this.specieRepo.findById(dto.specieId);

      if (!specie) {
        throw new GenericException(`Espécie com id ${dto.specieId} não encontrada`, HttpStatus.NOT_FOUND);
      }
      specieEntity = specie;
    }

    if (dto.publicationId) {
      const publication = await this.publicationRepo.findById(dto.publicationId);

      if (!publication) {
        throw new GenericException(
          `Publicação com id ${dto.publicationId} não encontrada`,
          HttpStatus.NOT_FOUND,
        );
      }
      publicationEntity = publication;
    }

    return { specie: specieEntity, publication: publicationEntity, animal };
  }

  private buildEntities(dto: UpdateAnimalDTO) {
    let gender: AnimalGender | undefined;
    let status: AnimalStatus | undefined;
    let breed: AnimalBreed | undefined;

    if (dto.gender) {
      const genderOrError = AnimalGender.create(dto.gender);

      if (genderOrError instanceof GenericAppError) {
        throw new GenericException(genderOrError);
      }

      gender = genderOrError;
    }

    if (dto.status) {
      const statusOrError = AnimalStatus.create(dto.status);

      if (statusOrError instanceof GenericAppError) {
        throw new GenericException(statusOrError);
      }

      status = statusOrError;
    }

    if (dto.breed) {
      const breedOrError = AnimalBreed.create(dto.breed);

      if (breedOrError instanceof GenericAppError) {
        throw new GenericException(breedOrError);
      }

      breed = breedOrError;
    }

    return { gender, status, breed };
  }
}
