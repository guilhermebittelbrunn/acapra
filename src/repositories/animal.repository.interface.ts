import {
  IBaseRepository,
  PaginatedResult,
  PaginationQuery,
  SingleEntityResponse,
} from './base.repository.interface';

import Animal from '@/module/animal/domain/animal/animal.domain';
import { AnimalGenderEnum, AnimalSizeEnum, AnimalStatusEnum } from '@/shared/types/animal';

export interface ListAnimalByAssociationIdQuery extends PaginationQuery {
  associationId: string;

  ids?: string[];
  specieIds?: string[];
  statuses?: AnimalStatusEnum[];
  genders?: AnimalGenderEnum[];
  sizes?: AnimalSizeEnum[];
}

export interface IAnimalRepository extends IBaseRepository<Animal> {
  findCompleteById(id: string): SingleEntityResponse<Animal>;
  listByAssociationId(query: ListAnimalByAssociationIdQuery): Promise<PaginatedResult<Animal>>;
  listBreeds(query: PaginationQuery): Promise<PaginatedResult<string>>;
}

export const IAnimalRepositorySymbol = Symbol('IAnimalRepository');
