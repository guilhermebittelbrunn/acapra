import {
  IBaseRepository,
  PaginatedResult,
  PaginationQuery,
  SingleEntityResponse,
} from './base.repository.interface';

import Specie from '@/module/animal/domain/specie.domain';

export interface ListSpecieByAssociationIdQuery extends PaginationQuery {
  associationId: string;
  enabled?: boolean;
}

export interface ISpecieRepository extends IBaseRepository<Specie> {
  findCompleteById(id: string): SingleEntityResponse<Specie>;
  listByAssociationId(query: ListSpecieByAssociationIdQuery): Promise<PaginatedResult<Specie>>;
}

export const ISpecieRepositorySymbol = Symbol('ISpecieRepository');
