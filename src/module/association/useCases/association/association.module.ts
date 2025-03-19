import { Module } from '@nestjs/common';
import { CreateAssociationModule } from './createAssociation/createAssociation.module';
import { UpdateAssociationModule } from './updateAssociation/updateAssociation.module';
import { FindAssociationByIdModule } from './findAssociationById/findAssociationById.module';

@Module({
  imports: [CreateAssociationModule, UpdateAssociationModule, FindAssociationByIdModule],
})
export class AssociationModule {}
