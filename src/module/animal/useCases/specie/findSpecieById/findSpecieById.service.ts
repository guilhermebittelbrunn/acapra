import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class FindSpecieByIdService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(id: string) {
    const specie = await this.specieRepo.findCompleteById(id);

    if (!specie) {
      throw new GenericException(`Espécie com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return specie;
  }
}
