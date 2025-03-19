import { Module } from '@nestjs/common';
import { CreateAssociationModule } from './createAssociation/createAssociation.module';
import { UpdateAssociationModule } from './updateAssociation/updateAssociation.module';

@Module({
  imports: [CreateAssociationModule, UpdateAssociationModule],
})
export class AssociationModule {}
