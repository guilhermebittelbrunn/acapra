import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class DeleteTagService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.tagRepo.delete(id);

    if (!deleted) {
      throw new GenericException(`Etiqueta com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }
  }
}
