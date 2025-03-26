import { Module } from '@nestjs/common';

import { CancelAdoptionRequestModule } from './cancelAdoptionRequest/cancelAdoptionRequest.module';
import { FindAdoptionByIdModule } from './findAdoptionById/findAdoptionById.module';
import { ListAdoptionsForAssociationModule } from './listAdoptionsForAssociation/listAdoptionsForAssociation.module';
import { ListAdoptionsForUserModule } from './listAdoptionsForUser /listAdoptionsForUser.module';
import { RequestAdoptionModule } from './requestAdoption/requestAdoption.module';
import { RespondAdoptionModule } from './respondAdoption/respondAdoption.module';

@Module({
  imports: [
    FindAdoptionByIdModule,
    ListAdoptionsForAssociationModule,
    ListAdoptionsForUserModule,
    RequestAdoptionModule,
    RespondAdoptionModule,
    CancelAdoptionRequestModule,
  ],
})
export class AdoptionModule {}
