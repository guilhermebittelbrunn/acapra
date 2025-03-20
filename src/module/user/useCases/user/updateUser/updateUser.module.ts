import { Module } from '@nestjs/common';

import { UpdateUserController } from './updateUser.controller';
import { UpdateUserService } from './updateUser.service';

import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Module({
  controllers: [UpdateUserController],
  providers: [
    UpdateUserService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class UpdateUserModule {}
