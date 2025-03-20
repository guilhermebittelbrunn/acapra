import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class FindAssociationByIdService {
  constructor(
    @Inject(IAssociationRepositorySymbol)
    private readonly associationRepo: IAssociationRepository,
  ) {}

  async execute(id: string) {
    const association = await this.associationRepo.findById(id);

    if (!association) {
      throw new GenericException(`Associação com id ${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return association;
  }
}
