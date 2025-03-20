import { IBaseRepository } from './base.repository.interface';

import { Association } from '@/module/association/domain/association.domain';

export interface IAssociationRepository extends IBaseRepository<Association> {}

export const IAssociationRepositorySymbol = Symbol('IAssociationRepository');
