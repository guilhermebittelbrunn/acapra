import { Module } from '@nestjs/common';
import { UpdateUserService } from './updateUser.service';
import { UpdateUserController } from './updateUser.controller';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';

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
