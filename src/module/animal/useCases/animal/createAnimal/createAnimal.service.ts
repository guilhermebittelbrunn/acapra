import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateAnimalDTO } from './dto/createAnimal.dto';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalGender from '@/module/animal/domain/animal/animalGender.domain';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
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
    @Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository,
    @Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository,
  ) {}

  async execute(dto: CreateAnimalDTO) {
    await this.validateFields(dto);

    const { gender } = this.buildEntities(dto);

    const animalOrError = Animal.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
      specieId: new UniqueEntityID(dto.specieId),
      breedId: new UniqueEntityID(dto.breedId),
      publicationId: UniqueEntityID.createOrUndefined(dto.publicationId),
      gender,
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

    const breed = await this.breedRepo.findById(dto.breedId);

    if (!breed) {
      throw new GenericException(`Raça com id ${dto.breedId} não encontrada`, HttpStatus.NOT_FOUND);
    }

    if (!breed.specieId.equals(specie.id)) {
      throw new GenericException(
        `A raça ${breed.name} não pertence à espécie ${specie.name}`,
        HttpStatus.BAD_REQUEST,
      );
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

    return { gender: genderOrError };
  }
}
