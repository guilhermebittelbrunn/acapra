import { Module } from '@nestjs/common';

import { CreateBreedController } from './createBreed.controller';
import { CreateBreedService } from './createBreed.service';

import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';

@Module({
  controllers: [CreateBreedController],
  providers: [
    CreateBreedService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class CreateBreedModule {}
