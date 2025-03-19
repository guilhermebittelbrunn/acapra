import { Module } from '@nestjs/common';
import { SignInModule } from '../auth/signIn/signIn.module';
import { SignUpModule } from '../auth/signUp/signUp.module';
import { RefreshModule } from '../auth/refresh/refresh.module';

@Module({
  imports: [SignUpModule, SignInModule, RefreshModule],
})
export class AuthModule {}
