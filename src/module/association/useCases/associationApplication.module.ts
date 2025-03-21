import { Module } from '@nestjs/common';

import { AssociationModule } from './association/association.module';
import { PublicationModule } from './publication/publication.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [AssociationModule, PublicationModule, TagModule],
})
export class AssociationApplicationModule {}
