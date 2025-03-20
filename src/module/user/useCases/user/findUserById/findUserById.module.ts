import { Module } from '@nestjs/common';

import { FindUserByIdController } from './findUserById.controller';
import { FindUserByIdService } from './findUserById.service';

import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Module({
  controllers: [FindUserByIdController],
  providers: [
    FindUserByIdService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class FindUserByIdModule {}
