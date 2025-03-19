import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { Als } from '@/shared/config/als/als.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { isEmpty } from 'class-validator';

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
