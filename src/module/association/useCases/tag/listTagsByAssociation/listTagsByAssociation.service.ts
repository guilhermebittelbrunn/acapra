import { Inject, Injectable } from '@nestjs/common';

import { ListTagsByAssociationDTO } from './dto/listTagsByAssociation.dto';

import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';

@Injectable()
export class ListTagsByAssociationService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(dto: ListTagsByAssociationDTO) {
    return this.tagRepo.listByAssociationId(dto);
  }
}
