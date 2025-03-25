import { Inject, Injectable } from '@nestjs/common';

import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindTagByIdService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(id: string) {
    const tag = await this.tagRepo.findById(id);

    if (!tag) {
      return new GenericErrors.NotFound(`Etiqueta com id ${id} não encontrada`);
    }

    return tag;
  }
}
