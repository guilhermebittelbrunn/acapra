import { Module } from '@nestjs/common';

import { ListNotificationsController } from './listNotifications.controller';
import { ListNotificationsService } from './listNotifications.service';

import { INotificationRepositorySymbol } from '@/repositories/notification.repository.interface';
import { NotificationRepository } from '@/repositories/prisma/notification.repository';

@Module({
  controllers: [ListNotificationsController],
  providers: [
    ListNotificationsService,
    {
      provide: INotificationRepositorySymbol,
      useClass: NotificationRepository,
    },
  ],
})
export class ListNotificationsModule {}
