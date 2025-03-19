import { Module } from '@nestjs/common';
import { FindPublicationByIdController } from './findPublicationById.controller';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { FindPublicationByIdService } from './findPublicationById.service';

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
