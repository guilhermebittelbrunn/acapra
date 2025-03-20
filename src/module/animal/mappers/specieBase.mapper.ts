import { SpecieBaseModel } from '@prisma/client';

import SpecieBase from '../domain/specieBase.domain';
import { SpecieBaseDTO } from '../dto/specieBase.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { SpecieBaseTypeEnum } from '@/shared/types/animal';
export interface SpecieBaseModelWithRelations extends SpecieBaseModel {}

class BaseSpecieBaseMapper extends Mapper<SpecieBase, SpecieBaseModelWithRelations, SpecieBaseDTO> {
  toDomain(specieBase: SpecieBaseModelWithRelations): SpecieBase {
    return SpecieBase.create(
      {
        name: specieBase.name,
        type: specieBase.type as SpecieBaseTypeEnum,
        enabled: specieBase.enabled,
        deleted: specieBase.deleted,
        createdAt: specieBase.createdAt,
        updatedAt: specieBase.updatedAt,
      },
      new UniqueEntityID(specieBase.id),
    ) as SpecieBase;
  }
  async toPersistence(specieBase: SpecieBase): Promise<SpecieBaseModelWithRelations> {
    return {
      id: specieBase.id.toValue(),
      name: specieBase.name,
      type: specieBase.type,
      enabled: specieBase.enabled,
      deleted: specieBase.deleted,
      createdAt: specieBase.createdAt,
      updatedAt: specieBase.updatedAt,
    } as SpecieBaseModelWithRelations;
  }
  toDTO(specieBase: SpecieBase): SpecieBaseDTO {
    return {
      id: specieBase.id.toValue(),
      type: specieBase.type,
      name: specieBase.name,
      enabled: specieBase.enabled,
    };
  }
}

const SpecieBaseMapper = new BaseSpecieBaseMapper();

export default SpecieBaseMapper;
