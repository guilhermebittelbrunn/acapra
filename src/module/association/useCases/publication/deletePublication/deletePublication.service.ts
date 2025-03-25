import { Inject, Injectable } from '@nestjs/common';

import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class DeletePublicationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(id: string) {
    const deleted = await this.publicationRepo.delete(id);

    if (!deleted) {
      return new GenericErrors.NotFound(`Publicação com id${id} não encontrada`);
    }
  }
}
