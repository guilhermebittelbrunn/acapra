import { Inject, Injectable } from '@nestjs/common';

import { ListAdoptionForAssociationDTO } from './dto/listAdoptionsForAssociation.dto';

import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';

@Injectable()
export class ListAdoptionsForAssociationService {
  constructor(@Inject(IAdoptionRepositorySymbol) private readonly adoptionRepo: IAdoptionRepository) {}

  async execute(dto: ListAdoptionForAssociationDTO) {
    return this.adoptionRepo.listAdoptionsForAssociation(dto);
  }
}
