import { Injectable } from '@nestjs/common';
import { AdoptionModel, Prisma } from '@prisma/client';
import { isEmpty } from 'class-validator';

import { BaseRepository } from './base.repository';

import {
  IAdoptionRepository,
  ListAdoptionsForAssociationQuery,
  ListAdoptionsForUserQuery,
} from '../adoption.repository.interface';
import { PaginatedResult } from '../base.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Adoption from '@/module/association/domain/adoption/adoption.domain';
import AdoptionMapper from '@/module/association/mappers/adoption.mapper';
import { Als } from '@/shared/config/als/als.interface';
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class AdoptionRepository
  extends BaseRepository<'adoptionModel', Adoption, AdoptionModel>
  implements IAdoptionRepository
{
  mapper = AdoptionMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('adoptionModel', prisma, als);
  }

  async create(data: Adoption): Promise<Adoption> {
    const persisted = await this.mapper.toPersistence(data);

    const adoptionRaw = await this.manager().create({
      data: {
        ...persisted,
        animal: { connect: { id: data.animalId.toValue() } },
        requestedByUser: { connect: { id: data.requestedBy.toValue() } },
        respondedByUser: data.respondedBy ? { connect: { id: data.respondedBy.toValue() } } : undefined,
        association: { connect: { id: data.associationId.toValue() } },
      } as Prisma.AdoptionModelCreateInput,
    });

    return this.mapper.toDomain(adoptionRaw);
  }

  async findCompleteById(id: string): Promise<Adoption | null> {
    const adoption = await this.manager().findUnique({
      where: { id },
      include: {
        animal: true,
        requestedByUser: true,
      },
    });

    return this.mapper.toDomain(adoption);
  }

  async listAdoptionsForAssociation(
    query: ListAdoptionsForAssociationQuery,
  ): Promise<PaginatedResult<Adoption>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    const where: Prisma.AdoptionModelWhereInput = {
      associationId: query.associationId,
      ...(filledArray(query.statuses) && { status: { in: query.statuses } }),
      ...(!isEmpty(query.term) && {
        OR: [
          { animal: { name: { contains: query.term } } },
          { observation: { contains: query.term } },
          { requestedByUser: { name: { contains: query.term } } },
        ],
      }),
    };

    const [adoptions, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: adoptions.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }

  async listAdoptionsForUser(query: ListAdoptionsForUserQuery): Promise<PaginatedResult<Adoption>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    const where: Prisma.AdoptionModelWhereInput = {
      requestedBy: query.userId,
      ...(filledArray(query.statuses) && { status: { in: query.statuses } }),
      ...(!isEmpty(query.term) && {
        OR: [{ animal: { name: { contains: query.term } } }, { observation: { contains: query.term } }],
      }),
    };

    const [adoptions, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: adoptions.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
