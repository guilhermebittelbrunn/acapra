import { Inject, Injectable } from '@nestjs/common';

import { ListSpeciesBaseDTO } from './dto/listSpeciesBase.dto';

import {
  ISpecieBaseRepository,
  ISpecieBaseRepositorySymbol,
} from '@/repositories/specieBase.repository.interface';

@Injectable()
export class ListSpeciesBaseService {
  constructor(@Inject(ISpecieBaseRepositorySymbol) private readonly specieRepo: ISpecieBaseRepository) {}

  async execute(dto: ListSpeciesBaseDTO) {
    return this.specieRepo.list(dto);
  }
}
