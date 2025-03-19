import { Module } from '@nestjs/common';
import { ListUsersByAssociationService } from './listUsersByAssociation.service';
import { ListUsersByAssociationController } from './listUsersByAssociation.controller';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';

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
