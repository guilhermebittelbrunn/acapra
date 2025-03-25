import { Inject, Injectable } from '@nestjs/common';

import { SignInDTO } from './dto/signIn.dto';

import { JwtService } from '@/infra/jwt/jwt.service';
import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class SignInService {
  constructor(
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: SignInDTO) {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !user?.password) {
      return new GenericErrors.NotFound('Usuário não encontrado');
    }

    const passwordMatch = await user.password.compare(password);

    if (!passwordMatch) {
      return new GenericErrors.InvalidParam('Senha incorreta');
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
