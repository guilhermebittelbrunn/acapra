import { Module } from '@nestjs/common';

import { SignInController } from './signIn.controller';
import { SignInService } from './signIn.service';

import { JwtModule } from '@/infra/jwt/jwt.module';
import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Module({
  imports: [JwtModule],
  controllers: [SignInController],
  providers: [
    SignInService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class SignInModule {}
