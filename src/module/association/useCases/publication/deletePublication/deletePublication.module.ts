import { Module } from '@nestjs/common';

import { DeletePublicationController } from './deletePublication.controller';
import { DeletePublicationService } from './deletePublication.service';

import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';

@Module({
  controllers: [DeletePublicationController],
  providers: [
    DeletePublicationService,
    {
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class DeletePublicationModule {}
