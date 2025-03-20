import { Module } from '@nestjs/common';

import { CreatePublicationController } from './createPublication.controller';
import { CreatePublicationService } from './createPublication.service';

import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';

@Module({
  controllers: [CreatePublicationController],
  providers: [
    CreatePublicationService,
    {
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class CreatePublicationModule {}
