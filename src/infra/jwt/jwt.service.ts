import { ISessionUser } from '@/shared/types/user';
import { Global, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateTokens({ id, ...rest }: ISessionUser) {
    const payload = {
      sub: id,
      ...rest,
    };
    /** Refers to the access_token (1 day in milliseconds) */
    const EXPIRE_TIME = 86400000;
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: this.configService.getOrThrow('jwt.secret'),
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '14 days',
        secret: this.configService.getOrThrow('jwt.refreshSecret'),
      }),
      /** Refers to the access_token */
      expires_in: EXPIRE_TIME,
      /** Refers to the access_token */
      expires_at: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
