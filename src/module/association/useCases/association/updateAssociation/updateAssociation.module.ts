import { Module } from '@nestjs/common';

import { UpdateAssociationController } from './updateAssociation.controller';
import { UpdateAssociationService } from './updateAssociation.service';

import { IAssociationRepositorySymbol } from '@/repositories/association.repository.interface';
import { AssociationRepository } from '@/repositories/prisma/association.repository';

@Module({
  controllers: [UpdateAssociationController],
  providers: [
    UpdateAssociationService,
    {
      provide: IAssociationRepositorySymbol,
      useClass: AssociationRepository,
    },
  ],
})
export class UpdateAssociationModule {}
