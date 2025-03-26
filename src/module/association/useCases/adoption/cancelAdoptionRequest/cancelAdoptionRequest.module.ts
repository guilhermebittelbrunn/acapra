import { Module } from '@nestjs/common';

import { CancelAdoptionRequestController } from './cancelAdoptionRequest.controller';
import { CancelAdoptionRequestService } from './cancelAdoptionRequest.service';

import { IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { AdoptionRepository } from '@/repositories/prisma/adoption.repository';

@Module({
  controllers: [CancelAdoptionRequestController],
  providers: [
    CancelAdoptionRequestService,
    {
      provide: IAdoptionRepositorySymbol,
      useClass: AdoptionRepository,
    },
  ],
})
export class CancelAdoptionRequestModule {}
