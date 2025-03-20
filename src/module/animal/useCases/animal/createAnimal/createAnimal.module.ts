import { Module } from '@nestjs/common';

import { CreateAnimalController } from './createAnimal.controller';
import { CreateAnimalService } from './createAnimal.service';

import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { BreedRepository } from '@/repositories/prisma/breed.repository';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  controllers: [CreateAnimalController],
  providers: [
    CreateAnimalService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
    {
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class CreateAnimalModule {}
