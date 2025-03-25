import { Inject, Injectable } from '@nestjs/common';

import { JwtService } from '@/infra/jwt/jwt.service';
import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class RefreshService {
  constructor(
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      return new GenericErrors.NotFound('Usuário não encontrado');
    }

    const tokens = await this.jwtService.generateTokens({
      id: user.id.toValue(),
      email: user.email.value,
      type: user.type.value,
    });

    return {
      user,
      tokens,
    };
  }
}
