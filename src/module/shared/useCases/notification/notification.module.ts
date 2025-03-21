import { Module } from '@nestjs/common';

import { ListNotificationsModule } from './listNotifications/listNotifications.module';

@Module({
  imports: [ListNotificationsModule],
})
export class NotificationModule {}
