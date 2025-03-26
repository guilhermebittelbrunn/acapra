import { Module } from '@nestjs/common';

import { FindAdoptionByIdController } from './findAdoptionById.controller';
import { FindAdoptionByIdService } from './findAdoptionById.service';

import { IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { AdoptionRepository } from '@/repositories/prisma/adoption.repository';

@Module({
  controllers: [FindAdoptionByIdController],
  providers: [
    FindAdoptionByIdService,
    {
      provide: IAdoptionRepositorySymbol,
      useClass: AdoptionRepository,
    },
  ],
})
export class FindAdoptionByIdModule {}
