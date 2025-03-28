import { Injectable } from '@nestjs/common';
import { WishListModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IWishListRepository } from '../wishList.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import WishList from '@/module/user/domain/wishList.domain';
import WishListMapper from '@/module/user/mappers/wishList.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class WishListRepository
  extends BaseRepository<'wishListModel', WishList, WishListModel>
  implements IWishListRepository
{
  mapper = WishListMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('wishListModel', prisma, als);
  }
}
