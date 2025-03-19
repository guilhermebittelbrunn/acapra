import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ListUsersByAssociationDTO } from './dto/listUsersByAssociation.dto';

@Injectable()
export class ListUsersByAssociationService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(query: ListUsersByAssociationDTO) {
    const users = await this.userRepo.listByAssociationId(query);

    return users;
  }
}
