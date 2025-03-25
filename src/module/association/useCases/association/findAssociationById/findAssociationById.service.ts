import { Inject, Injectable } from '@nestjs/common';

import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindAssociationByIdService {
  constructor(
    @Inject(IAssociationRepositorySymbol)
    private readonly associationRepo: IAssociationRepository,
  ) {}

  async execute(id: string) {
    const association = await this.associationRepo.findById(id);

    if (!association) {
      return new GenericErrors.NotFound(`Associação com id ${id} não encontrada`);
    }

    return association;
  }
}
