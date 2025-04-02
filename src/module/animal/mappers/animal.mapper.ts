import { AnimalModel, AssociationModel, PublicationModel, TagAnimalModel } from '@prisma/client';

import SpecieMapper, { SpecieModelWithRelations } from './specie.mapper';

import Animal from '../domain/animal/animal.domain';
import AnimalBreed from '../domain/animal/animalBreed.domain';
import AnimalGender from '../domain/animal/animalGender.domain';
import AnimalSize from '../domain/animal/animalSize.domain';
import AnimalStatus from '../domain/animal/animalStatus.domain';
import AnimalDTO from '../dto/animal.dto';

import AssociationMapper from '@/module/association/mappers/association.mapper';
import PublicationMapper from '@/module/association/mappers/publication.mapper';
import TagMapper from '@/module/association/mappers/tag.mapper';
import TagAnimalMapper from '@/module/association/mappers/tagAnimal.mapper';
import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { AnimalGenderEnum, AnimalSizeEnum, AnimalStatusEnum } from '@/shared/types/animal';

export interface AnimalModelWithRelations extends AnimalModel {
  specie?: SpecieModelWithRelations;
  association?: AssociationModel;
  publication?: PublicationModel | null;
  tagAnimals?: TagAnimalModel[];
}

class BaseAnimalMapper extends Mapper<Animal, AnimalModelWithRelations, AnimalDTO> {
  toDomain(animal: AnimalModelWithRelations): Animal {
    return Animal.create(
      {
        name: animal.name,
        associationId: new UniqueEntityID(animal.associationId),
        specieId: new UniqueEntityID(animal.specieId),
        breed: AnimalBreed.create(animal.breed) as AnimalBreed,
        publicationId: UniqueEntityID.createOrUndefined(animal.publicationId),
        age: animal.age,
        status: AnimalStatus.create(animal.status as AnimalStatusEnum) as AnimalStatus,
        gender: AnimalGender.create(animal.gender as AnimalGenderEnum) as AnimalGender,
        description: animal.description,
        weight: animal.weight,
        size: AnimalSize.create(animal.size as AnimalSizeEnum) as AnimalSize,
        deleted: animal.deleted,
        createdAt: animal.createdAt,
        updatedAt: animal.updatedAt,
        specie: SpecieMapper.toDomainOrUndefined(animal.specie),
        association: AssociationMapper.toDomainOrUndefined(animal.association),
        publication: PublicationMapper.toDomainOrUndefined(animal.publication),
        tagAnimals: animal.tagAnimals?.map(TagAnimalMapper.toDomain),
      },
      new UniqueEntityID(animal.id),
    ) as Animal;
  }
  async toPersistence(animal: Animal): Promise<AnimalModelWithRelations> {
    return {
      id: animal.id.toValue(),
      associationId: animal.associationId.toValue(),
      specieId: animal.specieId.toValue(),
      breed: animal.breed.value,
      publicationId: animal.publicationId?.toValue(),
      name: animal.name,
      weight: animal.weight,
      age: animal.age,
      description: animal.description,
      size: animal.size.value,
      gender: animal.gender.value,
      status: animal.status.value,
      deleted: animal.deleted,
      createdAt: animal.createdAt,
      updatedAt: animal.updatedAt,
    };
  }
  toDTO(animal: Animal): AnimalDTO {
    return {
      id: animal.id.toValue(),
      associationId: animal.associationId.toValue(),
      specieId: animal.specieId.toValue(),
      breed: animal.breed.value,
      isFavorite: animal.isFavorite,
      publicationId: animal.publicationId?.toValue(),
      name: animal.name,
      description: animal.description,
      age: animal.age,
      weight: animal.weight,
      status: animal.status.value,
      gender: animal.gender.value,
      size: animal.size.value,
      createdAt: animal.createdAt,
      updatedAt: animal.updatedAt,
      specie: SpecieMapper.toDTOOrUndefined(animal.specie),
      publication: PublicationMapper.toDTOOrUndefined(animal.publication),
      tags: animal.tags?.map(TagMapper.toDTO),
    };
  }
}

const AnimalMapper = new BaseAnimalMapper();

export default AnimalMapper;
