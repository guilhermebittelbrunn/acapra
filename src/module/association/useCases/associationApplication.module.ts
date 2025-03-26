import { Module } from '@nestjs/common';

import { AdoptionModule } from './adoption/adoption.module';
import { AssociationModule } from './association/association.module';
import { PublicationModule } from './publication/publication.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [AssociationModule, PublicationModule, TagModule, AdoptionModule],
})
export class AssociationApplicationModule {}
