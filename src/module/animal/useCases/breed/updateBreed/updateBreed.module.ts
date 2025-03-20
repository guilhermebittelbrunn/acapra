import { Module } from '@nestjs/common';

import { UpdateBreedController } from './updateBreed.controller';
import { UpdateBreedService } from './updateBreed.service';

import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';

@Module({
  controllers: [UpdateBreedController],
  providers: [
    UpdateBreedService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class UpdateBreedModule {}
