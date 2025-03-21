import { Module } from '@nestjs/common';

import { CreateTagController } from './createTag.controller';
import { CreateTagService } from './createTag.service';

import { TagRepository } from '@/repositories/prisma/tag.repository';
import { ITagRepositorySymbol } from '@/repositories/tag.repository.interface';

@Module({
  controllers: [CreateTagController],
  providers: [
    CreateTagService,
    {
      provide: ITagRepositorySymbol,
      useClass: TagRepository,
    },
  ],
})
export class CreateTagModule {}
