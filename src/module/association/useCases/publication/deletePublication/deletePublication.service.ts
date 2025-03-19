import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeletePublicationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.publicationRepo.delete(id);

    if (!deleted) {
      throw new GenericException(`Publicação com id${id} não encontrada`, HttpStatus.NOT_FOUND);
    }
  }
}
