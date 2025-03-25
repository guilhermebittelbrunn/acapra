import { Inject, Injectable } from '@nestjs/common';

import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindSpecieByIdService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(id: string) {
    const specie = await this.specieRepo.findCompleteById(id);

    if (!specie) {
      return new GenericErrors.NotFound(`Espécie com id${id} não encontrada`);
    }

    return specie;
  }
}
