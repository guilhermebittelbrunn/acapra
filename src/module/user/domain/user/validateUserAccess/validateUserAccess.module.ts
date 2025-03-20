import { Global, Module } from '@nestjs/common';

import { ValidateUserAccess } from './validateUserAccess.service';

import { UserRepository } from '@/repositories/prisma/user.repository';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { AlsModule } from '@/shared/config/als/als.module';

@Global()
@Module({
  imports: [AlsModule],
  providers: [
    ValidateUserAccess,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
  exports: [ValidateUserAccess],
})
export class ValidateUserAccessModule {}
