import { Global, Module } from '@nestjs/common';

import { ValidateUserAccess } from './validateUserAccess.service';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';
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
