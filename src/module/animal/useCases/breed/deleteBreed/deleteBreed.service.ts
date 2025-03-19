import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteBreedService {
  constructor(@Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.breedRepo.delete(id);

    if (!deleted) {
      throw new GenericException(`Raça com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }
  }
}
