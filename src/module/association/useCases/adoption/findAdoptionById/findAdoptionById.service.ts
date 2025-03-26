import { Inject, Injectable } from '@nestjs/common';

import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindAdoptionByIdService {
  constructor(@Inject(IAdoptionRepositorySymbol) private readonly adoptionRepo: IAdoptionRepository) {}

  async execute(id: string) {
    const adoption = await this.adoptionRepo.findCompleteById(id);

    if (!adoption) {
      return new GenericErrors.NotFound(`Adoção com id ${id} não encontrada`);
    }

    return adoption;
  }
}
