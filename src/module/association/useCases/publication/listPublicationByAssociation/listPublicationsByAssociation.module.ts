import { Module } from '@nestjs/common';

import { ListPublicationsByAssociationController } from './listPublicationsByAssociation.controller';
import { ListPublicationsByAssociationService } from './listPublicationsByAssociation.service';

import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';

@Module({
  controllers: [ListPublicationsByAssociationController],
  providers: [
    ListPublicationsByAssociationService,
    {
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class ListPublicationsByAssociationModule {}
