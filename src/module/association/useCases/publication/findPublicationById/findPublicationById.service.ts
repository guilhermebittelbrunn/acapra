import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class FindPublicationByIdService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(id: string) {
    const publication = await this.publicationRepo.findById(id);

    if (!publication) {
      throw new GenericException(`Publicação com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return publication;
  }
}
