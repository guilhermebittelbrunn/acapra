import { Inject, Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class ValidateUserAccess {
  constructor(
    private readonly als: Als,
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
  ) {}

  async validate(userId: string) {
    if (isEmpty(userId)) {
      return null;
    }

    const user = await this.userRepo.findById(userId);

    if (!user) {
      return null;
    }

    this.als.getStore().user = user;

    return user;
  }
}
