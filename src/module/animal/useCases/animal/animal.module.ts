import { Module } from '@nestjs/common';
import { CreateAnimalModule } from './createAnimal/createAnimal.module';
import { UpdateAnimalModule } from './updateAnimal/updateAnimal.module';
import { DeleteAnimalModule } from './deleteAnimal/deleteAnimal.module';
import { FindAnimalByIdModule } from './findAnimalById/findAnimalById.module';
import { ListAnimalsByAssociationModule } from './listAnimalsByAssociation/listAnimalsByAssociation.module';

@Module({
  imports: [
    CreateAnimalModule,
    UpdateAnimalModule,
    FindAnimalByIdModule,
    DeleteAnimalModule,
    ListAnimalsByAssociationModule,
  ],
})
export class AnimalModule {}
