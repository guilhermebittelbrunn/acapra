import { Module } from '@nestjs/common';

import { EmitNotificationService } from './emitNotification.service';

import { INotificationRepositorySymbol } from '@/repositories/notification.repository.interface';
import { NotificationRepository } from '@/repositories/prisma/notification.repository';

@Module({
  providers: [
    EmitNotificationService,
    {
      provide: INotificationRepositorySymbol,
      useClass: NotificationRepository,
    },
  ],
  exports: [EmitNotificationService],
})
export class EmitNotificationModule {}
