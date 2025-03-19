import { Module } from '@nestjs/common';
import { CreateAssociationService } from './createAssociation.service';
import { CreateAssociationController } from './createAssociation.controller';
import { SignUpModule } from '@/module/user/useCases/auth/signUp/signUp.module';
import { IAssociationRepositorySymbol } from '@/repositories/association.repository.interface';
import { AssociationRepository } from '@/repositories/prisma/association.repository';

@Module({
  imports: [SignUpModule],
  controllers: [CreateAssociationController],
  providers: [
    CreateAssociationService,
    {
      provide: IAssociationRepositorySymbol,
      useClass: AssociationRepository,
    },
  ],
})
export class CreateAssociationModule {}
