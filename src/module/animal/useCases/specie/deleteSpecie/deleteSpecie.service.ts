import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteSpecieService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.specieRepo.delete(id);

    if (!deleted) {
      throw new GenericException(`Espécie com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }
  }
}
