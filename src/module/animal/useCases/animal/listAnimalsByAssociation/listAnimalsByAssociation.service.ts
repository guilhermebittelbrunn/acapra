import { Inject, Injectable } from '@nestjs/common';

import { ListAnimalsByAssociationDTO } from './dto/listAnimalsByAssociation.dto';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';

@Injectable()
export class ListAnimalsByAssociationService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(dto: ListAnimalsByAssociationDTO) {
    return this.animalRepo.listByAssociationId(dto);
  }
}
