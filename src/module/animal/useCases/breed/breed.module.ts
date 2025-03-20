import { Module } from '@nestjs/common';

import { CreateBreedModule } from './createBreed/createBreed.module';
import { DeleteBreedModule } from './deleteBreed/deleteBreed.module';
import { FindBreedByIdModule } from './findBreedById/findBreedById.module';
import { ListBreedsByAssociationModule } from './listBreedsByAssociation/listBreedsByAssociation.module';
import { UpdateBreedModule } from './updateBreed/updateBreed.module';

@Module({
  imports: [
    CreateBreedModule,
    UpdateBreedModule,
    FindBreedByIdModule,
    DeleteBreedModule,
    ListBreedsByAssociationModule,
  ],
})
export class BreedModule {}
