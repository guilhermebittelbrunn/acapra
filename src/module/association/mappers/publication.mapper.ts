import { PublicationModel } from '@prisma/client';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import Publication from '../domain/publication.domain';
import { PublicationDTO } from '../dto/publication.dto';

export interface PublicationModelWithRelations extends PublicationModel {}

class BasePublicationMapper extends Mapper<Publication, PublicationModelWithRelations, PublicationDTO> {
  toDomain(publication: PublicationModelWithRelations): Publication {
    return Publication.create(
      {
        title: publication.title,
        content: publication.content,
        associationId: new UniqueEntityID(publication.associationId),
        enabled: publication.enabled,
        deleted: publication.deleted,
        createdAt: publication.createdAt,
        updatedAt: publication.updatedAt,
      },
      new UniqueEntityID(publication.id),
    ) as Publication;
  }
  async toPersistence(publication: Publication): Promise<PublicationModelWithRelations> {
    return {
      id: publication.id.toValue(),
      associationId: publication.associationId.toValue(),
      title: publication.title,
      content: publication.content,
      enabled: publication.enabled,
      deleted: publication.deleted,
      createdAt: publication.createdAt,
      updatedAt: publication.updatedAt,
    } as PublicationModelWithRelations;
  }
  toDTO(publication: Publication): PublicationDTO {
    return {
      id: publication.id.toValue(),
      associationId: publication.associationId.toValue(),
      title: publication.title,
      content: publication.content,
      enabled: publication.enabled,
    };
  }
}

const PublicationMapper = new BasePublicationMapper();

export default PublicationMapper;
