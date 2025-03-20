import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import { AnimalStatusEnum } from '@/shared/types/animal';

@Injectable()
export class DeleteAnimalService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(id: string): Promise<void> {
    const animal = await this.animalRepo.findById(id);

    if (!animal) {
      throw new GenericException(`Animal com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    if ([AnimalStatusEnum.ADOPTED, AnimalStatusEnum.IN_ADOPTION].includes(animal.status.value)) {
      throw new GenericException(
        'Não é possível deletar um animal que está em adoção ou já foi adotado',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.animalRepo.delete(id);
  }
}
