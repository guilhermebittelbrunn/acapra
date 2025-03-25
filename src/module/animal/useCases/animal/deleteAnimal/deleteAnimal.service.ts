import { Inject, Injectable } from '@nestjs/common';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalStatusEnum } from '@/shared/types/animal';

@Injectable()
export class DeleteAnimalService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(id: string) {
    const animal = await this.animalRepo.findById(id);

    if (!animal) {
      return new GenericErrors.NotFound(`Animal com id ${id} não encontrado`);
    }

    if ([AnimalStatusEnum.ADOPTED, AnimalStatusEnum.IN_ADOPTION].includes(animal.status.value)) {
      return new GenericErrors.InvalidParam(
        'Não é possível deletar um animal que está em adoção ou já foi adotado',
      );
    }

    await this.animalRepo.delete(id);
  }
}
