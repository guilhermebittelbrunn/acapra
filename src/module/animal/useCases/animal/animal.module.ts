import { Module } from '@nestjs/common';

import { CreateAnimalModule } from './createAnimal/createAnimal.module';
import { DeleteAnimalModule } from './deleteAnimal/deleteAnimal.module';
import { FindAnimalByIdModule } from './findAnimalById/findAnimalById.module';
import { ListAnimalsByAssociationModule } from './listAnimalsByAssociation/listAnimalsByAssociation.module';
import { ListBreedsModule } from './listBreeds/listBreeds.module';
import { UpdateAnimalModule } from './updateAnimal/updateAnimal.module';

@Module({
  imports: [
    CreateAnimalModule,
    UpdateAnimalModule,
    FindAnimalByIdModule,
    DeleteAnimalModule,
    ListAnimalsByAssociationModule,
    ListBreedsModule,
  ],
})
export class AnimalModule {}
