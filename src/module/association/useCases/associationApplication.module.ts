import { Module } from '@nestjs/common';
import { AssociationModule } from './association/association.module';

@Module({
  imports: [AssociationModule],
})
export class AssociationApplicationModule {}
