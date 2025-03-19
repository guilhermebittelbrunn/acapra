import { Module } from '@nestjs/common';
import { UpdatePublicationController } from './updatePublication.controller';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { UpdatePublicationService } from './updatePublication.service';

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
