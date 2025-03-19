import { Module } from '@nestjs/common';
import { ListPublicationsByAssociationController } from './listPublicationsByAssociation.controller';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { ListPublicationsByAssociationService } from './listPublicationsByAssociation.service';

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
