import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

import SpecieBase from '@/module/animal/domain/specieBase.domain';

export interface ListSpecieBaseQuery extends PaginationQuery {
  enabled?: boolean;
}

export interface ISpecieBaseRepository extends IBaseRepository<SpecieBase> {
  list(query: ListSpecieBaseQuery): Promise<PaginatedResult<SpecieBase>>;
}

export const ISpecieBaseRepositorySymbol = Symbol('ISpecieBaseRepository');
