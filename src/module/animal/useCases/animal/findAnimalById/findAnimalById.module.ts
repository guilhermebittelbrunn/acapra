import { Module } from '@nestjs/common';

import { FindAnimalByIdController } from './findAnimalById.controller';
import { FindAnimalByIdService } from './findAnimalById.service';

import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';

@Module({
  controllers: [FindAnimalByIdController],
  providers: [
    FindAnimalByIdService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class FindAnimalByIdModule {}
