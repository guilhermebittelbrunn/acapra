import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class DeleteUserService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(id: string) {
    const deleted = await this.userRepo.delete(id);

    if (!deleted) {
      return new GenericErrors.NotFound(`Usuário com id ${id} não encontrado`);
    }
  }
}
