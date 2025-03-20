import { Module } from '@nestjs/common';

import { ListUsersByAssociationController } from './listUsersByAssociation.controller';
import { ListUsersByAssociationService } from './listUsersByAssociation.service';

import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Module({
  controllers: [ListUsersByAssociationController],
  providers: [
    ListUsersByAssociationService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class ListUsersByAssociationModule {}
