import { PictureModel } from '@prisma/client';

import Picture from '../domain/picture/picture.domain';
import { PictureDTO } from '../dto/picture.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface PictureModelWithRelations extends PictureModel {}

class BasePictureMapper extends Mapper<Picture, PictureModelWithRelations, PictureDTO> {
  toDomain(picture: PictureModelWithRelations): Picture {
    return Picture.create(
      {
        entityId: new UniqueEntityID(picture.entityId),
        url: picture.url,
        originalName: picture.originalName,
        path: picture.path,
        sequence: picture.sequence,
        enabled: picture.enabled,
        deleted: picture.deleted,
        createdAt: picture.createdAt,
        updatedAt: picture.updatedAt,
      },
      new UniqueEntityID(picture.id),
    ) as Picture;
  }
  async toPersistence(picture: Picture): Promise<PictureModelWithRelations> {
    return {
      id: picture.id.toValue(),
      entityId: picture.entityId.toValue(),
      url: picture.url,
      originalName: picture.originalName,
      path: picture.path,
      sequence: picture.sequence,
      enabled: picture.enabled,
      deleted: picture.deleted,
      createdAt: picture.createdAt,
      updatedAt: picture.updatedAt,
    };
  }
  toDTO(picture: Picture): PictureDTO {
    return {
      id: picture.id.toValue(),
      entityId: picture.entityId.toValue(),
      url: picture.url,
      originalName: picture.originalName,
      path: picture.path,
      sequence: picture.sequence,
      enabled: picture.enabled,
      createdAt: picture.createdAt,
      updatedAt: picture.updatedAt,
    };
  }
}

const PictureMapper = new BasePictureMapper();

export default PictureMapper;
