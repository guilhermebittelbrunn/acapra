import { Module } from '@nestjs/common';

import { UpdateSpecieController } from './updateSpecie.controller';
import { UpdateSpecieService } from './updateSpecie.service';

import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { SpecieBaseRepository } from '@/repositories/prisma/specieBase.repository';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { ISpecieBaseRepositorySymbol } from '@/repositories/specieBase.repository.interface';

@Module({
  controllers: [UpdateSpecieController],
  providers: [
    UpdateSpecieService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
    {
      provide: ISpecieBaseRepositorySymbol,
      useClass: SpecieBaseRepository,
    },
  ],
})
export class UpdateSpecieModule {}
