import { Module } from '@nestjs/common';

import { ListAdoptionsForAssociationController } from './listAdoptionsForAssociation.controller';
import { ListAdoptionsForAssociationService } from './listAdoptionsForAssociation.service';

import { IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { AdoptionRepository } from '@/repositories/prisma/adoption.repository';

@Module({
  controllers: [ListAdoptionsForAssociationController],
  providers: [
    ListAdoptionsForAssociationService,
    {
      provide: IAdoptionRepositorySymbol,
      useClass: AdoptionRepository,
    },
  ],
})
export class ListAdoptionsForAssociationModule {}
