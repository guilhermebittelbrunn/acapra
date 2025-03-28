import { Inject, Injectable } from '@nestjs/common';

import { CancelAdoptionRequestDTO } from './dto/cancelAdoptionRequest.dto';

import AdoptionStatus from '@/module/association/domain/adoption/adoptionStatus.domain';
import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AdoptionStatusEnum } from '@/shared/types/association';

@Injectable()
export class CancelAdoptionRequestService {
  constructor(@Inject(IAdoptionRepositorySymbol) private readonly adoptionRepo: IAdoptionRepository) {}

  async execute({ id, userId }: CancelAdoptionRequestDTO) {
    const adoption = await this.adoptionRepo.findById(id);

    if (!adoption) {
      return new GenericErrors.NotFound(`Adoção com id ${id} não encontrada`);
    }

    if (!adoption.requestedBy.equalsRaw(userId)) {
      return new GenericErrors.NotAuthorized('Você não tem permissão para cancelar esta adoção');
    }

    if ([AdoptionStatusEnum.CANCELED].includes(adoption.status.value)) {
      return new GenericErrors.InvalidParam('Solicitação de adoção já cancelada');
    }

    if (![AdoptionStatusEnum.PENDING].includes(adoption.status.value)) {
      return new GenericErrors.InvalidParam('Não é possível cancelar uma adoção que não está pendente');
    }

    adoption.status = AdoptionStatus.create(AdoptionStatusEnum.CANCELED) as AdoptionStatus;

    return this.adoptionRepo.update(adoption);
  }
}
