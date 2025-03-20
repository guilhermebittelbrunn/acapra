import { Module } from '@nestjs/common';

import { CreateAssociationModule } from './createAssociation/createAssociation.module';
import { FindAssociationByIdModule } from './findAssociationById/findAssociationById.module';
import { UpdateAssociationModule } from './updateAssociation/updateAssociation.module';

@Module({
  imports: [CreateAssociationModule, UpdateAssociationModule, FindAssociationByIdModule],
})
export class AssociationModule {}
