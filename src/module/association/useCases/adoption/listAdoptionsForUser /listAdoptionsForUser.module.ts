import { Module } from '@nestjs/common';

import { ListAdoptionsForUserController } from './listAdoptionsForUser.controller';
import { ListAdoptionsForUserService } from './listAdoptionsForUser.service';

import { IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { AdoptionRepository } from '@/repositories/prisma/adoption.repository';

@Module({
  controllers: [ListAdoptionsForUserController],
  providers: [
    ListAdoptionsForUserService,
    {
      provide: IAdoptionRepositorySymbol,
      useClass: AdoptionRepository,
    },
  ],
})
export class ListAdoptionsForUserModule {}
