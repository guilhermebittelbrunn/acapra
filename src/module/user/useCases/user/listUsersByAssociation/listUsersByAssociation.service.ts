import { Inject, Injectable } from '@nestjs/common';

import { ListUsersByAssociationDTO } from './dto/listUsersByAssociation.dto';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Injectable()
export class ListUsersByAssociationService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(query: ListUsersByAssociationDTO) {
    return this.userRepo.listByAssociationId(query);
  }
}
