import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class DeleteUserService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.userRepo.delete(id);

    if (!deleted) {
      throw new GenericException(`Usuário com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }
  }
}
