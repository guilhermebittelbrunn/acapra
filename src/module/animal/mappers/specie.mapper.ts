import { SpecieModel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { SpecieDTO } from '../dto/specie.dto';
import Specie from '../domain/specie.domain';
export interface SpecieModelWithRelations extends SpecieModel {}

class BaseSpecieMapper extends Mapper<Specie, SpecieModelWithRelations, SpecieDTO> {
  toDomain(specie: SpecieModelWithRelations): Specie {
    return Specie.create(
      {
        name: specie.name,
        sequence: specie.sequence,
        associationId: new UniqueEntityID(specie.associationId),
        enabled: specie.enabled,
        deleted: specie.deleted,
        createdAt: specie.createdAt,
        updatedAt: specie.updatedAt,
      },
      new UniqueEntityID(specie.id),
    ) as Specie;
  }
  async toPersistence(specie: Specie): Promise<SpecieModelWithRelations> {
    return {
      id: specie.id.toValue(),
      associationId: specie.associationId.toValue(),
      name: specie.name,
      sequence: specie.sequence,
      enabled: specie.enabled,
      deleted: specie.deleted,
      createdAt: specie.createdAt,
      updatedAt: specie.updatedAt,
    } as SpecieModelWithRelations;
  }
  toDTO(specie: Specie): SpecieDTO {
    return {
      id: specie.id.toValue(),
      associationId: specie.associationId.toValue(),
      sequence: specie.sequence,
      name: specie.name,
      enabled: specie.enabled,
    };
  }
}

const SpecieMapper = new BaseSpecieMapper();

export default SpecieMapper;
