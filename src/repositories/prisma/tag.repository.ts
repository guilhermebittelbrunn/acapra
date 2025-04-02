import { Injectable } from '@nestjs/common';
import { Prisma, TagModel } from '@prisma/client';
import { isEmpty } from 'class-validator';

import { BaseRepository } from './base.repository';

import { PaginatedResult } from '../base.repository.interface';
import { ITagRepository, ListTagByAssociationIdQuery } from '../tag.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Tag from '@/module/association/domain/tag/tag.domain';
import TagMapper from '@/module/association/mappers/tag.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class TagRepository extends BaseRepository<'tagModel', Tag, TagModel> implements ITagRepository {
  mapper = TagMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('tagModel', prisma, als);
  }

  async listByAssociationId(query: ListTagByAssociationIdQuery): Promise<PaginatedResult<Tag>> {
    const { limit, page, skip } = this.getPaginationParams(query);
    const { enabled } = { ...query };

    const where: Prisma.TagModelWhereInput = {
      associationId: query.associationId,
      ...(!isEmpty(query.enabled) && { enabled }),
    };

    const [tags, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: [{ name: 'asc' }],
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: tags.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
