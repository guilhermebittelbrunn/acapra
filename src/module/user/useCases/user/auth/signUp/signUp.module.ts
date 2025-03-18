import { Module } from '@nestjs/common';
import { SignUpController } from './signUp.controller';
import { SignUpService } from './signUp.service';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';

@Module({
  controllers: [SignUpController],
  providers: [
    SignUpService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
  exports: [SignUpService],
})
export class SignUpModule {}
