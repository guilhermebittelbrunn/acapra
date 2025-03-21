import { Module } from '@nestjs/common';

import { FindTagByIdController } from './findTagById.controller';
import { FindTagByIdService } from './findTagById.service';

import { TagRepository } from '@/repositories/prisma/tag.repository';
import { ITagRepositorySymbol } from '@/repositories/tag.repository.interface';

@Module({
  controllers: [FindTagByIdController],
  providers: [
    FindTagByIdService,
    {
      provide: ITagRepositorySymbol,
      useClass: TagRepository,
    },
  ],
})
export class FindTagByIdModule {}
