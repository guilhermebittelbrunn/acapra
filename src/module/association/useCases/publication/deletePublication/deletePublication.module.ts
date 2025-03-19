import { Module } from '@nestjs/common';
import { DeletePublicationController } from './deletePublication.controller';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { DeletePublicationService } from './deletePublication.service';

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
