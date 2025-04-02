import { TagAnimalModel, TagModel } from '@prisma/client';

import TagMapper from './tag.mapper';

import TagAnimal from '../domain/tag/tagAnimal.domain';
import { TagAnimalDTO } from '../dto/tagAnimal.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface TagAnimalModelWithRelations extends TagAnimalModel {
  tag?: TagModel;
}

class BaseTagAnimalMapper extends Mapper<TagAnimal, TagAnimalModelWithRelations, TagAnimalDTO> {
  toDomain(tagAnimal: TagAnimalModelWithRelations): TagAnimal {
    return TagAnimal.create(
      {
        tagId: new UniqueEntityID(tagAnimal.tagId),
        animalId: new UniqueEntityID(tagAnimal.animalId),
        deleted: tagAnimal.deleted,
        createdAt: tagAnimal.createdAt,
        updatedAt: tagAnimal.updatedAt,
        tag: TagMapper.toDomainOrUndefined(tagAnimal.tag),
      },
      new UniqueEntityID(tagAnimal.id),
    ) as TagAnimal;
  }
  async toPersistence(tagAnimal: TagAnimal): Promise<TagAnimalModelWithRelations> {
    return {
      id: tagAnimal.id.toValue(),
      tagId: tagAnimal.tagId.toValue(),
      animalId: tagAnimal.animalId.toValue(),
      deleted: tagAnimal.deleted,
      createdAt: tagAnimal.createdAt,
      updatedAt: tagAnimal.updatedAt,
    };
  }
  toDTO(tagAnimal: TagAnimal): TagAnimalDTO {
    return {
      id: tagAnimal.id.toValue(),
      tagId: tagAnimal.tagId.toValue(),
      animalId: tagAnimal.animalId.toValue(),
      createdAt: tagAnimal.createdAt,
      updatedAt: tagAnimal.updatedAt,
    };
  }
}

const TagAnimalMapper = new BaseTagAnimalMapper();

export default TagAnimalMapper;
