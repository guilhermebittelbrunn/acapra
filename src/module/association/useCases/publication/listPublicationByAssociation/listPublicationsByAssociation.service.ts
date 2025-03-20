import { Inject, Injectable } from '@nestjs/common';

import { ListPublicationByAssociationDTO } from './dto/listPublicationsByAssociation.dto';

import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';

@Injectable()
export class ListPublicationsByAssociationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(dto: ListPublicationByAssociationDTO) {
    return this.publicationRepo.listByAssociationId(dto);
  }
}
