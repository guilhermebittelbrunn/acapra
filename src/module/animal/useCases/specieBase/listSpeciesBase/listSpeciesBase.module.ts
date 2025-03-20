import { Module } from '@nestjs/common';

import { ListSpeciesBaseController } from './listSpeciesBase.controller';
import { ListSpeciesBaseService } from './listSpeciesBase.service';

import { SpecieBaseRepository } from '@/repositories/prisma/specieBase.repository';
import { ISpecieBaseRepositorySymbol } from '@/repositories/specieBase.repository.interface';

@Module({
  controllers: [ListSpeciesBaseController],
  providers: [
    ListSpeciesBaseService,
    {
      provide: ISpecieBaseRepositorySymbol,
      useClass: SpecieBaseRepository,
    },
  ],
})
export class ListSpeciesBaseModule {}
