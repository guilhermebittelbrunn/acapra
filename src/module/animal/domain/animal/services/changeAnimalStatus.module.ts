import { Module } from '@nestjs/common';

import { ChangeAnimalStatusService } from './changeAnimalStatus.service';

import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';

@Module({
  providers: [
    ChangeAnimalStatusService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
  exports: [ChangeAnimalStatusService],
})
export class ChangeAnimalStatusModule {}
