import {
  IBaseRepository,
  PaginatedResult,
  PaginationQuery,
  SingleEntityResponse,
} from './base.repository.interface';

import Adoption from '@/module/association/domain/adoption/adoption.domain';

export interface ListAdoptionsForAssociationQuery extends PaginationQuery {
  associationId: string;

  statuses?: string[];
}

export interface ListAdoptionsForUserQuery extends PaginationQuery {
  userId: string;

  statuses?: string[];
}

export interface IAdoptionRepository extends IBaseRepository<Adoption> {
  findCompleteById(id: string): SingleEntityResponse<Adoption>;
  listAdoptionsForAssociation(query: ListAdoptionsForAssociationQuery): Promise<PaginatedResult<Adoption>>;
  listAdoptionsForUser(query: ListAdoptionsForUserQuery): Promise<PaginatedResult<Adoption>>;
}

export const IAdoptionRepositorySymbol = Symbol('IAdoptionRepository');
