import { Inject, Injectable } from '@nestjs/common';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindAnimalByIdService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(id: string) {
    const animal = await this.animalRepo.findCompleteById(id);

    if (!animal) {
      return new GenericErrors.NotFound(`Animal com id${id} não encontrada`);
    }

    return animal;
  }
}
