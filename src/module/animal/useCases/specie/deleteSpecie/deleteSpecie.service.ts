import { Inject, Injectable } from '@nestjs/common';

import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class DeleteSpecieService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(id: string) {
    const deleted = await this.specieRepo.delete(id);

    if (!deleted) {
      return new GenericErrors.NotFound(`Espécie com id${id} não encontrada`);
    }
  }
}
