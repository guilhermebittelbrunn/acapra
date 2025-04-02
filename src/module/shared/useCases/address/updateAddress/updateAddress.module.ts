import { Module } from '@nestjs/common';

import { UpdateAddressController } from './updateAddress.controller';
import { UpdateAddressService } from './updateAddress.service';

import { SignUpModule } from '@/module/user/useCases/auth/signUp/signUp.module';
import { IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import { AddressRepository } from '@/repositories/prisma/address.repository';

@Module({
  imports: [SignUpModule],
  controllers: [UpdateAddressController],
  providers: [
    UpdateAddressService,

    {
      provide: IAddressRepositorySymbol,
      useClass: AddressRepository,
    },
  ],
})
export class UpdateAddressModule {}
