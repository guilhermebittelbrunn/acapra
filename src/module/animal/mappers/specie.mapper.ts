import { SpecieBaseModel, SpecieModel } from '@prisma/client';

import SpecieBaseMapper from './specieBase.mapper';

import Specie from '../domain/specie.domain';
import { SpecieDTO } from '../dto/specie.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface SpecieModelWithRelations extends SpecieModel {
  specieBase?: SpecieBaseModel;
}

class BaseSpecieMapper extends Mapper<Specie, SpecieModelWithRelations, SpecieDTO> {
  toDomain(specie: SpecieModelWithRelations): Specie {
    return Specie.create(
      {
        name: specie.name,
        sequence: specie.sequence,
        associationId: new UniqueEntityID(specie.associationId),
        specieBaseId: new UniqueEntityID(specie.specieBaseId),
        enabled: specie.enabled,
        deleted: specie.deleted,
        createdAt: specie.createdAt,
        updatedAt: specie.updatedAt,
        specieBase: SpecieBaseMapper.toDomainOrUndefined(specie.specieBase),
      },
      new UniqueEntityID(specie.id),
    ) as Specie;
  }
  async toPersistence(specie: Specie): Promise<SpecieModel> {
    return {
      id: specie.id.toValue(),
      associationId: specie.associationId.toValue(),
      specieBaseId: specie.specieBaseId.toValue(),
      name: specie.name,
      sequence: specie.sequence,
      enabled: specie.enabled,
      deleted: specie.deleted,
      createdAt: specie.createdAt,
      updatedAt: specie.updatedAt,
    };
  }
  toDTO(specie: Specie): SpecieDTO {
    return {
      id: specie.id.toValue(),
      associationId: specie.associationId.toValue(),
      specieBaseId: specie.specieBaseId.toValue(),
      sequence: specie.sequence,
      name: specie.name,
      enabled: specie.enabled,
      specieBase: SpecieBaseMapper.toDTOOrUndefined(specie.specieBase),
    };
  }
}

const SpecieMapper = new BaseSpecieMapper();

export default SpecieMapper;
