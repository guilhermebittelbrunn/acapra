import { Module } from '@nestjs/common';

import { ListBreedsController } from './listBreeds.controller';
import { ListBreedsService } from './listBreeds.service';

import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';

@Module({
  controllers: [ListBreedsController],
  providers: [
    ListBreedsService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class ListBreedsModule {}
