import { Module } from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [NotificationModule, AddressModule],
})
export class SharedApplicationModule {}
