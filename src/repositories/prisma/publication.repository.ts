import { Injectable } from '@nestjs/common';
import { Prisma, PublicationModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';
import { PaginatedResult } from '../base.repository.interface';
import {
  IPublicationRepository,
  ListPublicationByAssociationIdQuery,
} from '../publication.repository.interface';
import Publication from '@/module/association/domain/publication.domain';
import PublicationMapper from '@/module/association/mappers/publication.mapper';

@Injectable()
export class PublicationRepository
  extends BaseRepository<'publicationModel', Publication, PublicationModel>
  implements IPublicationRepository
{
  mapper = PublicationMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('publicationModel', prisma, als);
  }

  async listByAssociationId(query: ListPublicationByAssociationIdQuery): Promise<PaginatedResult<Publication>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    let where: Prisma.PublicationModelWhereInput = { associationId: query.associationId };

    const [publications, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: { title: 'asc' },
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: publications.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
