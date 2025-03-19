import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/signIn.dto';
import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { JwtService } from '@/infra/jwt/jwt.service';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class SignInService {
  constructor(
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: SignInDTO) {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !user?.password) {
      throw new GenericException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await user.password.compare(password);

    if (!passwordMatch) {
      throw new GenericException('Senha incorreta', HttpStatus.UNAUTHORIZED);
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
