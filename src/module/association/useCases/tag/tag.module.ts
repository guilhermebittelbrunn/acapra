import { Module } from '@nestjs/common';

import { CreateTagModule } from './createTag/createTag.module';
import { DeleteTagModule } from './deleteTag/deleteTag.module';
import { FindTagByIdModule } from './findTagById/findTagById.module';
import { ListTagsByAssociationModule } from './listTagsByAssociation/listTagsByAssociation.module';
import { UpdateTagModule } from './updateTag/updateTag.module';

@Module({
  imports: [CreateTagModule, UpdateTagModule, FindTagByIdModule, DeleteTagModule, ListTagsByAssociationModule],
})
export class TagModule {}
