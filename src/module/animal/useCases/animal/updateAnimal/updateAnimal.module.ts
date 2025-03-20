import { Module } from '@nestjs/common';
import { UpdateAnimalController } from './updateAnimal.controller';
import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { UpdateAnimalService } from './updateAnimal.service';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';

@Module({
  controllers: [UpdateAnimalController],
  providers: [
    UpdateAnimalService,
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
export class UpdateAnimalModule {}
