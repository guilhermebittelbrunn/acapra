import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WishListModule } from './wishlist/wishList.module';

@Module({
  imports: [UserModule, AuthModule, WishListModule],
})
export class UserApplicationModule {}
