import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

import Breed from '@/module/animal/domain/breed.domain';

export interface ListBreedByAssociationIdQuery extends PaginationQuery {
  associationId: string;
  specieIds?: string[];
}

export interface IBreedRepository extends IBaseRepository<Breed> {
  listByAssociationId(query: ListBreedByAssociationIdQuery): Promise<PaginatedResult<Breed>>;
}

export const IBreedRepositorySymbol = Symbol('IBreedRepository');
