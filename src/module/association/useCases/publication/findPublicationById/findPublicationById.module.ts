import { Module } from '@nestjs/common';

import { FindPublicationByIdController } from './findPublicationById.controller';
import { FindPublicationByIdService } from './findPublicationById.service';

import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';

@Module({
  controllers: [FindPublicationByIdController],
  providers: [
    FindPublicationByIdService,
    {
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class FindPublicationByIdModule {}
