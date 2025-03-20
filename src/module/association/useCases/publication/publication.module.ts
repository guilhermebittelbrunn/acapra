import { Module } from '@nestjs/common';

import { CreatePublicationModule } from './createPublication/createPublication.module';
import { DeletePublicationModule } from './deletePublication/deletePublication.module';
import { FindPublicationByIdModule } from './findPublicationById/findPublicationById.module';
import { ListPublicationsByAssociationModule } from './listPublicationByAssociation/listPublicationsByAssociation.module';
import { UpdatePublicationModule } from './updatePublication/updatePublication.module';

@Module({
  imports: [
    CreatePublicationModule,
    UpdatePublicationModule,
    FindPublicationByIdModule,
    DeletePublicationModule,
    ListPublicationsByAssociationModule,
  ],
})
export class PublicationModule {}
