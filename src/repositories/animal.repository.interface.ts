import {
  IBaseRepository,
  PaginatedResult,
  PaginationQuery,
  SingleEntityResponse,
} from './base.repository.interface';

import Animal from '@/module/animal/domain/animal/animal.domain';
import { AnimalGenderEnum, AnimalStatusEnum } from '@/shared/types/animal';

export interface ListAnimalByAssociationIdQuery extends PaginationQuery {
  associationId: string;

  ids?: string[];
  specieIds?: string[];
  breedIds?: string[];
  statuses?: AnimalStatusEnum[];
  genders?: AnimalGenderEnum[];
}

export interface IAnimalRepository extends IBaseRepository<Animal> {
  findCompleteById(id: string): SingleEntityResponse<Animal>;
  listByAssociationId(query: ListAnimalByAssociationIdQuery): Promise<PaginatedResult<Animal>>;
}

export const IAnimalRepositorySymbol = Symbol('IAnimalRepository');
