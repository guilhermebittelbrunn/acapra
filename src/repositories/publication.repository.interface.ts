import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

import Publication from '@/module/association/domain/publication.domain';

export interface ListPublicationByAssociationIdQuery extends PaginationQuery {
  associationId: string;
}

export interface IPublicationRepository extends IBaseRepository<Publication> {
  listByAssociationId(query: ListPublicationByAssociationIdQuery): Promise<PaginatedResult<Publication>>;
}

export const IPublicationRepositorySymbol = Symbol('IPublicationRepository');
