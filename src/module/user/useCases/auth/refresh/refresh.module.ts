import { Module } from '@nestjs/common';

import { RefreshController } from './refresh.controller';
import { RefreshService } from './refresh.service';

import { JwtModule } from '@/infra/jwt/jwt.module';
import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';

@Module({
  imports: [JwtModule],
  controllers: [RefreshController],
  providers: [
    RefreshService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class RefreshModule {}
