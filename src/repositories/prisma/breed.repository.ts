import { Injectable } from '@nestjs/common';
import { Prisma, BreedModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { PaginatedResult } from '../base.repository.interface';
import { IBreedRepository, ListBreedByAssociationIdQuery } from '../breed.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Breed from '@/module/animal/domain/breed.domain';
import BreedMapper from '@/module/animal/mappers/breed.mapper';
import { Als } from '@/shared/config/als/als.interface';
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class BreedRepository
  extends BaseRepository<'breedModel', Breed, BreedModel>
  implements IBreedRepository
{
  mapper = BreedMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('breedModel', prisma, als);
  }

  async listByAssociationId(query: ListBreedByAssociationIdQuery): Promise<PaginatedResult<Breed>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    let where: Prisma.BreedModelWhereInput = { associationId: query.associationId };

    if (filledArray(query.specieIds)) {
      where = { ...where, specieId: { in: query.specieIds } };
    }

    const [breeds, total] = await Promise.all([
      this.manager().findMany({
        include: { specie: true },
        where,
        take: limit,
        skip,
        orderBy: [{ sequence: 'desc' }, { name: 'asc' }],
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: breeds.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
