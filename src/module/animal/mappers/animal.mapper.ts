import { AnimalModel, AssociationModel, BreedModel, PublicationModel, SpecieModel } from '@prisma/client';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import Animal from '../domain/animal/animal.domain';
import AnimalDTO from '../dto/animal.dto';
import AnimalStatus from '../domain/animal/animalStatus.domain';
import { AnimalGenderEnum, AnimalStatusEnum } from '@/shared/types/animal';
import AnimalGender from '../domain/animal/animalGender.domain';
import SpecieMapper from './specie.mapper';
import AssociationMapper from '@/module/association/mappers/association.mapper';
import BreedMapper from './breed.mapper';
import PublicationMapper from '@/module/association/mappers/publication.mapper';

export interface AnimalModelWithRelations extends AnimalModel {
  specie?: SpecieModel;
  association?: AssociationModel;
  breed?: BreedModel;
  publication?: PublicationModel | null;
}

class BaseAnimalMapper extends Mapper<Animal, AnimalModelWithRelations, AnimalDTO> {
  toDomain(animal: AnimalModelWithRelations): Animal {
    return Animal.create(
      {
        name: animal.name,
        associationId: new UniqueEntityID(animal.associationId),
        specieId: new UniqueEntityID(animal.specieId),
        breedId: new UniqueEntityID(animal.breedId),
        publicationId: UniqueEntityID.createOrUndefined(animal.publicationId),
        age: animal.age,
        status: AnimalStatus.create(animal.status as AnimalStatusEnum) as AnimalStatus,
        gender: AnimalGender.create(animal.gender as AnimalGenderEnum) as AnimalGender,
        description: animal.description,
        weight: animal.weight,
        deleted: animal.deleted,
        createdAt: animal.createdAt,
        updatedAt: animal.updatedAt,
        specie: SpecieMapper.toDomainOrUndefined(animal.specie),
        association: AssociationMapper.toDomainOrUndefined(animal.association),
        breed: BreedMapper.toDomainOrUndefined(animal.breed),
        publication: PublicationMapper.toDomainOrUndefined(animal.publication),
      },
      new UniqueEntityID(animal.id),
    ) as Animal;
  }
  async toPersistence(animal: Animal): Promise<AnimalModelWithRelations> {
    return {
      id: animal.id.toValue(),
      associationId: animal.associationId.toValue(),
      specieId: animal.specieId.toValue(),
      breedId: animal.breedId.toValue(),
      publicationId: animal.publicationId?.toValue(),
      name: animal.name,
      weight: animal.weight,
      age: animal.age,
      description: animal.description,
      gender: animal.gender.value,
      status: animal.status.value,
      deleted: animal.deleted,
      createdAt: animal.createdAt,
      updatedAt: animal.updatedAt,
    } as AnimalModelWithRelations;
  }
  toDTO(animal: Animal): AnimalDTO {
    return {
      id: animal.id.toValue(),
      associationId: animal.associationId.toValue(),
      specieId: animal.specieId.toValue(),
      breedId: animal.breedId.toValue(),
      publicationId: animal.publicationId?.toValue(),
      name: animal.name,
      description: animal.description,
      age: animal.age,
      weight: animal.weight,
      status: animal.status.value,
      gender: animal.gender.value,
      createdAt: animal.createdAt,
      updatedAt: animal.updatedAt,
      specie: SpecieMapper.toDTOOrUndefined(animal.specie),
      breed: BreedMapper.toDTOOrUndefined(animal.breed),
      publication: PublicationMapper.toDTOOrUndefined(animal.publication),
    };
  }
}

const AnimalMapper = new BaseAnimalMapper();

export default AnimalMapper;
