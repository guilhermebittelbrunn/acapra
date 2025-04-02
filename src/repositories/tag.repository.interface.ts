import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

import Tag from '@/module/association/domain/tag/tag.domain';

export interface ListTagByAssociationIdQuery extends PaginationQuery {
  associationId: string;

  enabled?: boolean;
}

export interface ITagRepository extends IBaseRepository<Tag> {
  listByAssociationId(query: ListTagByAssociationIdQuery): Promise<PaginatedResult<Tag>>;
}

export const ITagRepositorySymbol = Symbol('ITagRepository');
