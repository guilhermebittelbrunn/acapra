import { IBaseRepository, MultiEntityResponse } from './base.repository.interface';

import TagAnimal from '@/module/association/domain/tag/tagAnimal.domain';

export interface ITagAnimalRepository extends IBaseRepository<TagAnimal> {
  listByAnimalId(animalId: string): MultiEntityResponse<TagAnimal>;
}

export const ITagAnimalRepositorySymbol = Symbol('ITagAnimalRepository');
