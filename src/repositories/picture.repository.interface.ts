import { IBaseRepository, MultiEntityResponse } from './base.repository.interface';

import Picture from '@/module/shared/domain/picture/picture.domain';
import Pictures from '@/module/shared/domain/picture/pictures.domain';

export interface IPictureRepository extends IBaseRepository<Picture> {
  saveMany(pictures: Pictures): Promise<void>;
  findByAnimalId(animalId: string): MultiEntityResponse<Picture>;
}

export const IPictureRepositorySymbol = Symbol('IPictureRepository');
