import { Module } from '@nestjs/common';
import { ListBreedsByAssociationService } from './listBreedsByAssociation.service';
import { ListBreedsByAssociationController } from './listBreedsByAssociation.controller';
import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';

@Module({
  controllers: [ListBreedsByAssociationController],
  providers: [
    ListBreedsByAssociationService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class ListBreedsByAssociationModule {}
