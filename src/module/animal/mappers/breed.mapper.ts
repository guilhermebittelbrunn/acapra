import { BreedModel, SpecieModel } from '@prisma/client';

import SpecieMapper from './specie.mapper';

import Breed from '../domain/breed.domain';
import { BreedDTO } from '../dto/breed.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface BreedModelWithRelations extends BreedModel {
  specie?: SpecieModel;
}

class BaseBreedMapper extends Mapper<Breed, BreedModelWithRelations, BreedDTO> {
  toDomain(breed: BreedModelWithRelations): Breed {
    return Breed.create(
      {
        name: breed.name,
        sequence: breed.sequence,
        associationId: new UniqueEntityID(breed.associationId),
        specieId: new UniqueEntityID(breed.specieId),
        enabled: breed.enabled,
        deleted: breed.deleted,
        createdAt: breed.createdAt,
        updatedAt: breed.updatedAt,
        specie: SpecieMapper.toDomainOrUndefined(breed.specie),
      },
      new UniqueEntityID(breed.id),
    ) as Breed;
  }
  async toPersistence(breed: Breed): Promise<BreedModelWithRelations> {
    return {
      id: breed.id.toValue(),
      associationId: breed.associationId.toValue(),
      specieId: breed.specieId.toValue(),
      name: breed.name,
      sequence: breed.sequence,
      enabled: breed.enabled,
      deleted: breed.deleted,
      createdAt: breed.createdAt,
      updatedAt: breed.updatedAt,
    } as BreedModelWithRelations;
  }
  toDTO(breed: Breed): BreedDTO {
    return {
      id: breed.id.toValue(),
      associationId: breed.associationId.toValue(),
      specieId: breed.specieId.toValue(),
      sequence: breed.sequence,
      name: breed.name,
      enabled: breed.enabled,
      specie: SpecieMapper.toDTOOrUndefined(breed.specie),
    };
  }
}

const BreedMapper = new BaseBreedMapper();

export default BreedMapper;
