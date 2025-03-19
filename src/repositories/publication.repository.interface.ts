import Publication from '@/module/association/domain/publication.domain';
import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

export interface ListPublicationByAssociationIdQuery extends PaginationQuery {
  associationId: string;
}

export interface IPublicationRepository extends IBaseRepository<Publication> {
  listByAssociationId(query: ListPublicationByAssociationIdQuery): Promise<PaginatedResult<Publication>>;
}

export const IPublicationRepositorySymbol = Symbol('IPublicationRepository');
