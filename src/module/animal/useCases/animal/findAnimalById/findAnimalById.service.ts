import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAnimalByIdService {
  constructor(@Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository) {}

  async execute(id: string) {
    const animal = await this.animalRepo.findCompleteById(id);

    if (!animal) {
      throw new GenericException(`Animal com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return animal;
  }
}
