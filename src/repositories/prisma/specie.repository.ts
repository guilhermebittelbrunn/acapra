import { Injectable } from '@nestjs/common';
import { Prisma, SpecieModel } from '@prisma/client';
import { isEmpty } from 'class-validator';

import { BaseRepository } from './base.repository';

import { PaginatedResult } from '../base.repository.interface';
import { ISpecieRepository, ListSpecieByAssociationIdQuery } from '../specie.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Specie from '@/module/animal/domain/specie.domain';
import SpecieMapper from '@/module/animal/mappers/specie.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class SpecieRepository
  extends BaseRepository<'specieModel', Specie, SpecieModel>
  implements ISpecieRepository
{
  mapper = SpecieMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('specieModel', prisma, als);
  }

  async findCompleteById(id: string): Promise<Specie | null> {
    const specie = await this.manager().findUnique({
      where: { id },
      include: {
        specieBase: true,
      },
    });

    return this.mapper.toDomainOrNull(specie);
  }

  async listByAssociationId(query: ListSpecieByAssociationIdQuery): Promise<PaginatedResult<Specie>> {
    const { limit, page, skip } = this.getPaginationParams(query);
    const { enabled } = { ...query };

    const where: Prisma.SpecieModelWhereInput = {
      associationId: query.associationId,
      ...(!isEmpty(query.enabled) && { enabled }),
    };

    const [species, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: [{ sequence: 'asc' }, { name: 'asc' }],
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: species.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
