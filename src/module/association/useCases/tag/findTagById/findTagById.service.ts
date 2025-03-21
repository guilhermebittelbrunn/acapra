import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class FindTagByIdService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(id: string) {
    const tag = await this.tagRepo.findById(id);

    if (!tag) {
      throw new GenericException(`Etiqueta com id ${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return tag;
  }
}
