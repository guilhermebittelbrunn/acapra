import { Injectable } from '@nestjs/common';
import { Prisma, AnimalModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IAnimalRepository, ListAnimalByAssociationIdQuery } from '../animal.repository.interface';
import { PaginatedResult, PaginationQuery } from '../base.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalMapper from '@/module/animal/mappers/animal.mapper';
import { Als } from '@/shared/config/als/als.interface';
import { filledArray, isEmpty } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class AnimalRepository
  extends BaseRepository<'animalModel', Animal, AnimalModel>
  implements IAnimalRepository
{
  mapper = AnimalMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('animalModel', prisma, als);
  }

  async findCompleteById(id: string): Promise<Animal | null> {
    const animal = await this.manager().findUnique({
      where: { id },
      include: {
        specie: true,
        publication: true,
        association: true,
      },
    });

    return this.mapper.toDomainOrNull(animal);
  }

  async listByAssociationId(query: ListAnimalByAssociationIdQuery): Promise<PaginatedResult<Animal>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    const where: Prisma.AnimalModelWhereInput = {
      associationId: query.associationId,
      ...(!isEmpty(query.term) && { name: { contains: query.term } }),
      ...(filledArray(query.ids) && { id: { in: query.ids } }),
      ...(filledArray(query.specieIds) && { specieId: { in: query.specieIds } }),
      ...(filledArray(query.statuses) && { status: { in: query.statuses } }),
      ...(filledArray(query.genders) && { gender: { in: query.genders } }),
      ...(filledArray(query.sizes) && { size: { in: query.sizes } }),
      ...(!isEmpty(query.favorite) &&
        !isEmpty(query.userId) && { wishLists: { some: { userId: query.userId } } }),
    };

    const [animals, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: { name: 'asc' },
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: animals.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }

  async listBreeds(query: PaginationQuery): Promise<PaginatedResult<string>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    const breeds = await this.manager().groupBy({
      by: ['breed'],
      orderBy: { breed: 'asc' },
    });

    const uniqueBreeds = Array.from(new Set(breeds.map((b) => b.breed.toLowerCase())));

    const paginatedBreeds = uniqueBreeds.slice(skip, skip + limit);
    const total = uniqueBreeds.length;

    return {
      data: paginatedBreeds,
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
