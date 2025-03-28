import { Module } from '@nestjs/common';

import { CreateWishListController } from './createWishList.controller';
import { CreateWishListService } from './createWishList.service';

import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { WishListRepository } from '@/repositories/prisma/wishList.repository';
import { IWishListRepositorySymbol } from '@/repositories/wishList.repository.interface';

@Module({
  controllers: [CreateWishListController],
  providers: [
    CreateWishListService,
    {
      provide: IWishListRepositorySymbol,
      useClass: WishListRepository,
    },
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class CreateWishListModule {}
