import { Injectable } from '@nestjs/common';
import { AddressModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IAddressRepository } from '../address.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Address from '@/module/shared/domain/address.domain,';
import AddressMapper from '@/module/shared/mappers/address.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class AddressRepository
  extends BaseRepository<'addressModel', Address, AddressModel>
  implements IAddressRepository
{
  mapper = AddressMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('addressModel', prisma, als);
  }
}
