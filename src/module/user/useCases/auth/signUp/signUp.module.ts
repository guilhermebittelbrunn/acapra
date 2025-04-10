import { Module } from '@nestjs/common';

import { SignUpController } from './signUp.controller';
import { SignUpService } from './signUp.service';

import { IAssociationRepositorySymbol } from '@/repositories/association.repository.interface';
import { AssociationRepository } from '@/repositories/prisma/association.repository';
import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Module({
  controllers: [SignUpController],
  providers: [
    SignUpService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
    {
      provide: IAssociationRepositorySymbol,
      useClass: AssociationRepository,
    },
  ],
  exports: [SignUpService],
})
export class SignUpModule {}
