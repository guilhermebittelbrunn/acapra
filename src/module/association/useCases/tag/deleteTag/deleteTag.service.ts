import { Inject, Injectable } from '@nestjs/common';

import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class DeleteTagService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(id: string) {
    const deleted = await this.tagRepo.delete(id);

    if (!deleted) {
      return new GenericErrors.NotFound(`Etiqueta com id ${id} não encontrada`);
    }
  }
}
