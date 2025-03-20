import {
  IBaseRepository,
  PaginatedResult,
  PaginationQuery,
  SingleEntityResponse,
} from './base.repository.interface';

import User from '@/module/user/domain/user/user.domain';

export interface ListUsersByAssociationIdQuery extends PaginationQuery {
  associationId: string;
}
export interface IUserRepository extends IBaseRepository<User> {
  findCompleteById(id: string): SingleEntityResponse<User>;
  findByEmail(email: string): SingleEntityResponse<User>;
  listByAssociationId(query: ListUsersByAssociationIdQuery): Promise<PaginatedResult<User>>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
