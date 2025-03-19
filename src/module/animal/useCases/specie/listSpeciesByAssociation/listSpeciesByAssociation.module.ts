import { Module } from '@nestjs/common';
import { ListSpeciesByAssociationService } from './listSpeciesByAssociation.service';
import { ListSpeciesByAssociationController } from './listSpeciesByAssociation.controller';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';

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
