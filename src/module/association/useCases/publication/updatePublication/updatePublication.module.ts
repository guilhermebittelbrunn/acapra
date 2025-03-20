import { Module } from '@nestjs/common';

import { UpdatePublicationController } from './updatePublication.controller';
import { UpdatePublicationService } from './updatePublication.service';

import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';

@Module({
  controllers: [UpdatePublicationController],
  providers: [
    UpdatePublicationService,
    {
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class UpdatePublicationModule {}
