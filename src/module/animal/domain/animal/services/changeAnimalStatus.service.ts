import { Inject } from '@nestjs/common';

import Animal from '../animal.domain';
import AnimalStatus from '../animalStatus.domain';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalStatusEnum } from '@/shared/types/animal';

export class ChangeAnimalStatusService {
  constructor(
    @Inject(IAnimalRepositorySymbol)
    private readonly animalRepository: IAnimalRepository,
  ) {}

  async execute(animal: Animal, status: AnimalStatusEnum) {
    const newStatusOrError = AnimalStatus.create(status);

    if (newStatusOrError instanceof GenericAppError) {
      return newStatusOrError;
    }

    if (animal.status.equals(newStatusOrError)) {
      return new GenericErrors.InvalidParam('O status do animal já é o informado');
    }

    if ([AnimalStatusEnum.ADOPTED].includes(animal.status.value)) {
      return new GenericErrors.InvalidParam('Um animal adotado não pode ter seu status alterado');
    }

    animal.status = newStatusOrError;

    await this.animalRepository.update(animal);
  }
}
