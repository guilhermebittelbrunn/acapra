import { Module } from '@nestjs/common';

import { UpdateTagController } from './updateTag.controller';
import { UpdateTagService } from './updateTag.service';

import { TagRepository } from '@/repositories/prisma/tag.repository';
import { ITagRepositorySymbol } from '@/repositories/tag.repository.interface';

@Module({
  controllers: [UpdateTagController],
  providers: [
    UpdateTagService,
    {
      provide: ITagRepositorySymbol,
      useClass: TagRepository,
    },
  ],
})
export class UpdateTagModule {}
