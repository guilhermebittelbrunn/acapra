import { Association } from '@/module/association/domain/association.domain';
import { IBaseRepository, SingleEntityResponse } from './base.repository.interface';

export interface IAssociationRepository extends IBaseRepository<Association> {}

export const IAssociationRepositorySymbol = Symbol('IAssociationRepository');
