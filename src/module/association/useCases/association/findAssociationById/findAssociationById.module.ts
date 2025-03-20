import { Module } from '@nestjs/common';

import { FindAssociationByIdController } from './findAssociationById.controller';
import { FindAssociationByIdService } from './findAssociationById.service';

import { IAssociationRepositorySymbol } from '@/repositories/association.repository.interface';
import { AssociationRepository } from '@/repositories/prisma/association.repository';

@Module({
  controllers: [FindAssociationByIdController],
  providers: [
    FindAssociationByIdService,
    {
      provide: IAssociationRepositorySymbol,
      useClass: AssociationRepository,
    },
  ],
})
export class FindAssociationByIdModule {}
