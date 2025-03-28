import { Module } from '@nestjs/common';

import { CreateWishListModule } from './createWishList/createWishList.module';
import { DeleteWishListByAnimalModule } from './deleteWishListByAnimal/deleteWishlistByAnimal.module';

@Module({
  imports: [CreateWishListModule, DeleteWishListByAnimalModule],
})
export class WishListModule {}
