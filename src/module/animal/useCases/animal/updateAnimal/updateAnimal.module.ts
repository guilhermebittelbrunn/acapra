import { Module } from '@nestjs/common';

import { UpdateAnimalController } from './updateAnimal.controller';
import { UpdateAnimalService } from './updateAnimal.service';

import { AddTagToAnimalModule } from '@/module/association/domain/tag/services/addTagToAnimal/addTagToAnimal.module';
import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { PublicationRepository } from '@/repositories/prisma/publication.repository';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { IPublicationRepositorySymbol } from '@/repositories/publication.repository.interface';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  imports: [AddTagToAnimalModule],
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
      provide: IPublicationRepositorySymbol,
      useClass: PublicationRepository,
    },
  ],
})
export class UpdateAnimalModule {}
