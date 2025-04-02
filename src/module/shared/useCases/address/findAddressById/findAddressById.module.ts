import { Module } from '@nestjs/common';

import { FindAddressByIdController } from './findAddressById.controller';
import { FindAddressByIdService } from './findAddressById.service';

import { IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import { AddressRepository } from '@/repositories/prisma/address.repository';

@Module({
  controllers: [FindAddressByIdController],
  providers: [
    FindAddressByIdService,
    {
      provide: IAddressRepositorySymbol,
      useClass: AddressRepository,
    },
  ],
})
export class FindAddressByIdModule {}
