import { Module } from '@nestjs/common';

import { ListSpeciesByAssociationController } from './listSpeciesByAssociation.controller';
import { ListSpeciesByAssociationService } from './listSpeciesByAssociation.service';

import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  controllers: [ListSpeciesByAssociationController],
  providers: [
    ListSpeciesByAssociationService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class ListSpeciesByAssociationModule {}
