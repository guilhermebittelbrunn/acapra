import { Module } from '@nestjs/common';
import { FindUserByIdController } from './findUserById.controller';
import { FindUserByIdService } from './findUserById.service';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';

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
