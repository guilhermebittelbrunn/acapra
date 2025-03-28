import { Module } from '@nestjs/common';

import { DeleteWishListByAnimalController } from './deleteWishListByAnimal.controller';
import { DeleteWishListByAnimalService } from './deleteWishListByAnimal.service';

import { WishListRepository } from '@/repositories/prisma/wishList.repository';
import { IWishListRepositorySymbol } from '@/repositories/wishList.repository.interface';

@Module({
  controllers: [DeleteWishListByAnimalController],
  providers: [
    DeleteWishListByAnimalService,
    {
      provide: IWishListRepositorySymbol,
      useClass: WishListRepository,
    },
  ],
})
export class DeleteWishListByAnimalModule {}
