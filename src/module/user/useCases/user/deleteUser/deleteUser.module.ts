import { Module } from '@nestjs/common';
import { DeleteUserService } from './deleteUser.service';
import { DeleteUserController } from './deleteUser.controller';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';

@Module({
  controllers: [DeleteUserController],
  providers: [
    DeleteUserService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class DeleteUserModule {}
