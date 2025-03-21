import { Module } from '@nestjs/common';

import { ListTagsByAssociationController } from './listTagsByAssociation.controller';
import { ListTagsByAssociationService } from './listTagsByAssociation.service';

import { TagRepository } from '@/repositories/prisma/tag.repository';
import { ITagRepositorySymbol } from '@/repositories/tag.repository.interface';

@Module({
  controllers: [ListTagsByAssociationController],
  providers: [
    ListTagsByAssociationService,
    {
      provide: ITagRepositorySymbol,
      useClass: TagRepository,
    },
  ],
})
export class ListTagsByAssociationModule {}
