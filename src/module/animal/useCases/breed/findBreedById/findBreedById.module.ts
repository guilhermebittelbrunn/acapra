import { Module } from '@nestjs/common';

import { FindBreedByIdController } from './findBreedById.controller';
import { FindBreedByIdService } from './findBreedById.service';

import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';

@Module({
  controllers: [FindBreedByIdController],
  providers: [
    FindBreedByIdService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class FindBreedByIdModule {}
