import { Module } from '@nestjs/common';

import { CreateSpecieController } from './createSpecie.controller';
import { CreateSpecieService } from './createSpecie.service';

import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  controllers: [CreateSpecieController],
  providers: [
    CreateSpecieService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class CreateSpecieModule {}
