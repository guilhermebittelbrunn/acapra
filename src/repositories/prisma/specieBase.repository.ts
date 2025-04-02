import { Injectable } from '@nestjs/common';
import { Prisma, SpecieBaseModel } from '@prisma/client';
import { isEmpty } from 'class-validator';

import { BaseRepository } from './base.repository';

import { PaginatedResult } from '../base.repository.interface';
import { ISpecieBaseRepository, ListSpecieBaseQuery } from '../specieBase.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import SpecieBase from '@/module/animal/domain/specieBase.domain';
import SpecieBaseMapper from '@/module/animal/mappers/specieBase.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class SpecieBaseRepository
  extends BaseRepository<'specieBaseModel', SpecieBase, SpecieBaseModel>
  implements ISpecieBaseRepository
{
  mapper = SpecieBaseMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('specieBaseModel', prisma, als);
  }

  async list(query: ListSpecieBaseQuery): Promise<PaginatedResult<SpecieBase>> {
    const { limit, page, skip } = this.getPaginationParams(query);
    const { enabled } = { ...query };

    const where: Prisma.SpecieBaseModelWhereInput = {
      ...(!isEmpty(query.enabled) && { enabled }),
    };

    const [specieBases, total] = await Promise.all([
      this.manager().findMany({
        take: limit,
        where,
        skip,
        orderBy: { name: 'asc' },
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: specieBases.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
