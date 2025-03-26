import { Inject, Injectable } from '@nestjs/common';

import { RespondAdoptionDTO } from './dto/respondAdoption.dto';

import { ChangeAnimalStatusService } from '@/module/animal/domain/animal/services/changeAnimalStatus.service';
import Adoption from '@/module/association/domain/adoption/adoption.domain';
import AdoptionStatus from '@/module/association/domain/adoption/adoptionStatus.domain';
import { EmitNotificationService } from '@/module/shared/domain/notification/services/emitNotification/emitNotification.service';
import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalStatusEnum } from '@/shared/types/animal';
import { AdoptionStatusEnum } from '@/shared/types/association';
import { NotificationTypeEnum } from '@/shared/types/shared';

@Injectable()
export class RespondAdoptionService {
  constructor(
    @Inject(IAdoptionRepositorySymbol) private readonly adoptionRepo: IAdoptionRepository,
    private readonly notificationService: EmitNotificationService,
    private readonly changeAnimalStatusService: ChangeAnimalStatusService,
  ) {}

  async execute(dto: RespondAdoptionDTO) {
    const fieldsOrError = await this.validateAndFetchFields(dto);
    if (fieldsOrError instanceof GenericAppError) {
      return fieldsOrError;
    }
    const { adoption, status } = fieldsOrError;

    const isApproved = status.value === AdoptionStatusEnum.APPROVED;

    if (isApproved) {
      const changeAnimalStatusOrError = await this.changeAnimalStatusService.execute(
        adoption.animal,
        AnimalStatusEnum.ADOPTED,
      );

      if (changeAnimalStatusOrError instanceof GenericAppError) {
        return changeAnimalStatusOrError;
      }
    }

    adoption.status = Object.freeze(status);
    adoption.respondedBy = new UniqueEntityID(dto.userId);

    await this.sendNotification(adoption, isApproved);
    return this.adoptionRepo.update(adoption);
  }

  private async validateAndFetchFields(dto: RespondAdoptionDTO) {
    const adoption = await this.adoptionRepo.findCompleteById(dto.id);

    if (!adoption) {
      return new GenericErrors.NotFound(`Adoção com id ${dto.id} não encontrada`);
    }

    if (adoption.status.value !== AdoptionStatusEnum.PENDING) {
      return new GenericErrors.InvalidParam(`Adoção com id ${dto.id} não está pendente`);
    }

    const newStatusOrError = AdoptionStatus.create(dto.status);

    if (newStatusOrError instanceof GenericAppError) {
      return newStatusOrError;
    }

    return { adoption, status: newStatusOrError };
  }

  private async sendNotification(adoption: Adoption, isApproved: boolean) {
    await this.notificationService.execute({
      userId: adoption.requestedBy.toValue(),
      type: isApproved ? NotificationTypeEnum.SUCCESS : NotificationTypeEnum.WARNING,
      title: 'Adoção respondida',
      description: `Sua solicitação de adoção para o animal ${adoption.animal.name} foi ${isApproved ? 'aprovada' : 'rejeitada'}`,
    });
  }
}
