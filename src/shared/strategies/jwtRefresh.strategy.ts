import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ITokenPayload, JWT_REFRESH_STRATEGY } from '../types/auth';

import User from '@/module/user/domain/user/user.domain';
import { ValidateUserAccess } from '@/module/user/domain/user/validateUserAccess/validateUserAccess.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH_STRATEGY) {
  constructor(
    private readonly validateUserAccess: ValidateUserAccess,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Refresh'), // Authorization: Refresh <token>
      secretOrKey: config.getOrThrow('jwt.refreshSecret'),
    });
  }

  validate({ sub }: ITokenPayload): Promise<User> {
    return this.validateUserAccess.validate(sub);
  }
}
