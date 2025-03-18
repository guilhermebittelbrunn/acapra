import { Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';
import { JwtModule } from '@/infra/jwt/jwt.module';
import { RefreshController } from './refresh.controller';

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
