import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ListPublicationByAssociationDTO } from './dto/listPublicationsByAssociation.dto';

@Injectable()
export class ListPublicationsByAssociationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(dto: ListPublicationByAssociationDTO) {
    return this.publicationRepo.listByAssociationId(dto);
  }
}
