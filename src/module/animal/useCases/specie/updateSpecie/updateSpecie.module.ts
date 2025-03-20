import { Module } from '@nestjs/common';

import { UpdateSpecieController } from './updateSpecie.controller';
import { UpdateSpecieService } from './updateSpecie.service';

import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  controllers: [UpdateSpecieController],
  providers: [
    UpdateSpecieService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class UpdateSpecieModule {}
