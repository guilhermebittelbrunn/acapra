import { Inject, Injectable } from '@nestjs/common';

import { ListAdoptionForUserDTO } from './dto/listAdoptionsForUser.dto';

import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';

@Injectable()
export class ListAdoptionsForUserService {
  constructor(@Inject(IAdoptionRepositorySymbol) private readonly adoptionRepo: IAdoptionRepository) {}

  async execute(dto: ListAdoptionForUserDTO) {
    return this.adoptionRepo.listAdoptionsForUser(dto);
  }
}
