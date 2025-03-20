import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ListAnimalsByAssociationDTO } from './dto/listAnimalsByAssociation.dto';

@Injectable()
export class ListAnimalsByAssociationService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(dto: ListAnimalsByAssociationDTO) {
    return this.animalRepo.listByAssociationId(dto);
  }
}
