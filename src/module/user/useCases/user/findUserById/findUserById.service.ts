import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByIdService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.findCompleteById(id);

    if (!user) {
      throw new GenericException(`Usuário com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
