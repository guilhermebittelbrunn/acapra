import { Module } from '@nestjs/common';

import { RespondAdoptionController } from './respondAdoption.controller';
import { RespondAdoptionService } from './respondAdoption.service';

import { ChangeAnimalStatusModule } from '@/module/animal/domain/animal/services/changeAnimalStatus.module';
import { EmitNotificationModule } from '@/module/shared/domain/notification/services/emitNotification/emitNotification.module';
import { IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { AdoptionRepository } from '@/repositories/prisma/adoption.repository';

@Module({
  imports: [ChangeAnimalStatusModule, EmitNotificationModule],
  controllers: [RespondAdoptionController],
  providers: [
    RespondAdoptionService,
    {
      provide: IAdoptionRepositorySymbol,
      useClass: AdoptionRepository,
    },
  ],
})
export class RespondAdoptionModule {}
