import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

import Specie from '@/module/animal/domain/specie.domain';

export interface ListSpecieByAssociationIdQuery extends PaginationQuery {
  associationId: string;
}

export interface ISpecieRepository extends IBaseRepository<Specie> {
  listByAssociationId(query: ListSpecieByAssociationIdQuery): Promise<PaginatedResult<Specie>>;
}

export const ISpecieRepositorySymbol = Symbol('ISpecieRepository');
