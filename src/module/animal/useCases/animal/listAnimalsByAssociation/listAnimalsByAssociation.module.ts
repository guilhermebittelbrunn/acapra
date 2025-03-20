import { Module } from '@nestjs/common';

import { ListAnimalsByAssociationController } from './listAnimalsByAssociation.controller';
import { ListAnimalsByAssociationService } from './listAnimalsByAssociation.service';

import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';

@Module({
  controllers: [ListAnimalsByAssociationController],
  providers: [
    ListAnimalsByAssociationService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class ListAnimalsByAssociationModule {}
