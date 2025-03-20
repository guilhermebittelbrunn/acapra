import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class FindBreedByIdService {
  constructor(@Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository) {}

  async execute(id: string) {
    const breed = await this.breedRepo.findById(id);

    if (!breed) {
      throw new GenericException(`Raça com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return breed;
  }
}
