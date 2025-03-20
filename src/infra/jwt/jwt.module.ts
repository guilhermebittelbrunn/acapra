import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { JwtService } from './jwt.service';

@Module({
  imports: [NestJwtModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
