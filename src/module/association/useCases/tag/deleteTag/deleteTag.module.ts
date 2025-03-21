import { Module } from '@nestjs/common';

import { DeleteTagController } from './deleteTag.controller';
import { DeleteTagService } from './deleteTag.service';

import { TagRepository } from '@/repositories/prisma/tag.repository';
import { ITagRepositorySymbol } from '@/repositories/tag.repository.interface';

@Module({
  controllers: [DeleteTagController],
  providers: [
    DeleteTagService,
    {
      provide: ITagRepositorySymbol,
      useClass: TagRepository,
    },
  ],
})
export class DeleteTagModule {}
