import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindUserByIdService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.findCompleteById(id);

    if (!user) {
      return new GenericErrors.NotFound(`Usuário com id ${id} não encontrado`);
    }

    return user;
  }
}
