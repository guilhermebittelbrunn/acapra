import { Module } from '@nestjs/common';

import { CreateWishListModule } from './createWishList/createWishList.module';
import { DeleteWishListByAnimalModule } from './deleteWishListByAnimal/deleteWishListByAnimal.module';

@Module({
  imports: [CreateWishListModule, DeleteWishListByAnimalModule],
})
export class WishListModule {}
