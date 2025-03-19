import { Module } from '@nestjs/common';
import { UpdateAssociationService } from './updateAssociation.service';
import { UpdateAssociationController } from './updateAssociation.controller';
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
