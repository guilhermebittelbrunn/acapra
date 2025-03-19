import { Module } from '@nestjs/common';
import { FindBreedByIdController } from './findBreedById.controller';
import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';
import { FindBreedByIdService } from './findBreedById.service';

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
