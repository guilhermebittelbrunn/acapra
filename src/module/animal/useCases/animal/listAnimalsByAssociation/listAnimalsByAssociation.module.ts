import { Module } from '@nestjs/common';
import { ListAnimalsByAssociationController } from './listAnimalsByAssociation.controller';
import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { ListAnimalsByAssociationService } from './listAnimalsByAssociation.service';

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
