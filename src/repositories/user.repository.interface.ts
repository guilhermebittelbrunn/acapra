import User from '@/module/user/domain/user/user.domain';
import { IBaseRepository, SingleEntityResponse } from './base.repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findCompleteById(id: string): SingleEntityResponse<User>;
  findByEmail(email: string): SingleEntityResponse<User>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
