import { Module } from '@nestjs/common';
import { CreatePublicationModule } from './createPublication/createPublication.module';
import { UpdatePublicationModule } from './updatePublication/updatePublication.module';
import { FindPublicationByIdModule } from './findPublicationById/findPublicationById.module';
import { DeletePublicationModule } from './deletePublication/deletePublication.module';
import { ListPublicationsByAssociationModule } from './listPublicationByAssociation/listPublicationsByAssociation.module';

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
