import { TagModel } from '@prisma/client';

import Tag from '../domain/tag.domain';
import { TagDTO } from '../dto/tag.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface TagModelWithRelations extends TagModel {}

class BaseTagMapper extends Mapper<Tag, TagModelWithRelations, TagDTO> {
  toDomain(tag: TagModelWithRelations): Tag {
    return Tag.create(
      {
        name: tag.name,
        associationId: new UniqueEntityID(tag.associationId),
        enabled: tag.enabled,
        deleted: tag.deleted,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      },
      new UniqueEntityID(tag.id),
    ) as Tag;
  }
  async toPersistence(tag: Tag): Promise<TagModelWithRelations> {
    return {
      id: tag.id.toValue(),
      associationId: tag.associationId.toValue(),
      name: tag.name,
      enabled: tag.enabled,
      deleted: tag.deleted,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }
  toDTO(tag: Tag): TagDTO {
    return {
      id: tag.id.toValue(),
      associationId: tag.associationId.toValue(),
      name: tag.name,
      enabled: tag.enabled,
    };
  }
}

const TagMapper = new BaseTagMapper();

export default TagMapper;
