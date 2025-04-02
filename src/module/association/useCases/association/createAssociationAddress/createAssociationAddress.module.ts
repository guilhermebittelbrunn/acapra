import { Module } from '@nestjs/common';

import { CreateAssociationAddressController } from './createAssociationAddress.controller';
import { CreateAssociationAddressService } from './createAssociationAddress.service';

import { SignUpModule } from '@/module/user/useCases/auth/signUp/signUp.module';
import { IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import { IAssociationRepositorySymbol } from '@/repositories/association.repository.interface';
import { AddressRepository } from '@/repositories/prisma/address.repository';
import { AssociationRepository } from '@/repositories/prisma/association.repository';

@Module({
  imports: [SignUpModule],
  controllers: [CreateAssociationAddressController],
  providers: [
    CreateAssociationAddressService,
    {
      provide: IAssociationRepositorySymbol,
      useClass: AssociationRepository,
    },
    {
      provide: IAddressRepositorySymbol,
      useClass: AddressRepository,
    },
  ],
})
export class CreateAssociationAddressModule {}
