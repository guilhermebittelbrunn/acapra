import { Module } from '@nestjs/common';

import { DeleteBreedController } from './deleteBreed.controller';
import { DeleteBreedService } from './deleteBreed.service';

import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';

@Module({
  controllers: [DeleteBreedController],
  providers: [
    DeleteBreedService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class DeleteBreedModule {}
