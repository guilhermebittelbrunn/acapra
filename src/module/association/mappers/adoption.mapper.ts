import { AdoptionModel } from '@prisma/client';

import Adoption from '../domain/adoption/adoption.domain';
import AdoptionStatus from '../domain/adoption/adoptionStatus.domain';
import { AdoptionDTO } from '../dto/adoption.dto';

import AnimalMapper, { AnimalModelWithRelations } from '@/module/animal/mappers/animal.mapper';
import UserMapper, { UserModelWithRelations } from '@/module/user/mappers/user.mapper';
import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { AdoptionStatusEnum } from '@/shared/types/association';

export interface AdoptionModelWithRelations extends AdoptionModel {
  requestedByUser?: UserModelWithRelations;
  animal?: AnimalModelWithRelations;
}

class BaseAdoptionMapper extends Mapper<Adoption, AdoptionModelWithRelations, AdoptionDTO> {
  toDomain(adoption: AdoptionModelWithRelations): Adoption {
    return Adoption.create(
      {
        animalId: new UniqueEntityID(adoption.animalId),
        requestedBy: new UniqueEntityID(adoption.requestedBy),
        respondedBy: UniqueEntityID.createOrUndefined(adoption.respondedBy),
        associationId: new UniqueEntityID(adoption.associationId),
        observation: adoption.observation,
        status: AdoptionStatus.create(adoption.status as AdoptionStatusEnum) as AdoptionStatus,
        deleted: adoption.deleted,
        createdAt: adoption.createdAt,
        updatedAt: adoption.updatedAt,
        animal: AnimalMapper.toDomainOrUndefined(adoption.animal),
        requestedByUser: UserMapper.toDomainOrUndefined(adoption.requestedByUser),
      },
      new UniqueEntityID(adoption.id),
    ) as Adoption;
  }
  async toPersistence(adoption: Adoption): Promise<AdoptionModelWithRelations> {
    return {
      id: adoption.id.toValue(),
      observation: adoption.observation,
      status: adoption.status.value,
      deleted: adoption.deleted,
      createdAt: adoption.createdAt,
      updatedAt: adoption.updatedAt,
    } as AdoptionModelWithRelations;
  }
  toDTO(adoption: Adoption): AdoptionDTO {
    return {
      id: adoption.id.toValue(),
      animalId: adoption.animalId.toValue(),
      requestedBy: adoption.requestedBy.toValue(),
      respondedBy: adoption.respondedBy?.toValue(),
      associationId: adoption.associationId.toValue(),
      observation: adoption.observation,
      status: adoption.status.value,
      createdAt: adoption.createdAt,
      updatedAt: adoption.updatedAt,
      animal: AnimalMapper.toDTOOrUndefined(adoption.animal),
      requestedByUser: UserMapper.toDTOOrUndefined(adoption.requestedByUser),
    };
  }
}

const AdoptionMapper = new BaseAdoptionMapper();

export default AdoptionMapper;
