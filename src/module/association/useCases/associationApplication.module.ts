import { Module } from '@nestjs/common';

import { AssociationModule } from './association/association.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [AssociationModule, PublicationModule],
})
export class AssociationApplicationModule {}
