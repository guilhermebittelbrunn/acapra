import { Module } from '@nestjs/common';

import { FindAddressByIdModule } from './findAddressById/findAddressById.module';
import { UpdateAddressModule } from './updateAddress/updateAddress.module';

@Module({
  imports: [UpdateAddressModule, FindAddressByIdModule],
})
export class AddressModule {}
