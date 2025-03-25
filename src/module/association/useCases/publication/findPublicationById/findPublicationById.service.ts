import { Inject, Injectable } from '@nestjs/common';

import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindPublicationByIdService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(id: string) {
    const publication = await this.publicationRepo.findById(id);

    if (!publication) {
      return new GenericErrors.NotFound(`Publicação com id${id} não encontrada`);
    }

    return publication;
  }
}
