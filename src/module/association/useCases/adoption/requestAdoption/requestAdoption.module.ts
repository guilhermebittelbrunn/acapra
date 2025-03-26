import { Module } from '@nestjs/common';

import { RequestAdoptionController } from './requestAdoption.controller';
import { RequestAdoptionService } from './requestAdoption.service';

import { IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AdoptionRepository } from '@/repositories/prisma/adoption.repository';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';

@Module({
  controllers: [RequestAdoptionController],
  providers: [
    RequestAdoptionService,
    {
      provide: IAdoptionRepositorySymbol,
      useClass: AdoptionRepository,
    },
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class RequestAdoptionModule {}
