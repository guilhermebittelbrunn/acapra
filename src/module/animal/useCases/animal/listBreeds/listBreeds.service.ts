import { Inject, Injectable } from '@nestjs/common';

import { ListBreedsDTO } from './dto/listBreeds.dto';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';

@Injectable()
export class ListBreedsService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(dto: ListBreedsDTO) {
    return this.animalRepo.listBreeds(dto);
  }
}
