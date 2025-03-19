import { AssociationModel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { Association } from '../domain/association.domain';
import { AssociationDTO } from '../dto/association.dto';
export interface AssociationModelWithRelations extends AssociationModel {}

class BaseAssociationMapper extends Mapper<Association, AssociationModelWithRelations, AssociationDTO> {
  toDomain(association: AssociationModelWithRelations): Association {
    return Association.create(
      {
        name: association.name,
        deleted: association.deleted,
        createdAt: association.createdAt,
        updatedAt: association.updatedAt,
      },
      new UniqueEntityID(association.id),
    ) as Association;
  }
  async toPersistence(association: Association): Promise<AssociationModelWithRelations> {
    return {
      id: association.id.toValue(),
      name: association.name,
      deleted: association.deleted,
      createdAt: association.createdAt,
      updatedAt: association.updatedAt,
    } as AssociationModelWithRelations;
  }
  toDTO(association: Association): AssociationDTO {
    return {
      id: association.id.toValue(),
      name: association.name,
    };
  }
}

const AssociationMapper = new BaseAssociationMapper();

export default AssociationMapper;
