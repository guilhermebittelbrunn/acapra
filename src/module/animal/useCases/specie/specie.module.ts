import { Module } from '@nestjs/common';

import { CreateSpecieModule } from './createSpecie/createSpecie.module';
import { DeleteSpecieModule } from './deleteSpecie/deleteSpecie.module';
import { FindSpecieByIdModule } from './findSpecieById/findSpecieById.module';
import { ListSpeciesByAssociationModule } from './listSpeciesByAssociation/listSpeciesByAssociation.module';
import { UpdateSpecieModule } from './updateSpecie/updateSpecie.module';

@Module({
  imports: [
    CreateSpecieModule,
    UpdateSpecieModule,
    FindSpecieByIdModule,
    DeleteSpecieModule,
    ListSpeciesByAssociationModule,
  ],
})
export class SpecieModule {}
