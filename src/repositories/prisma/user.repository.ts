import { Injectable } from '@nestjs/common';
import { UserModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IUserRepository } from '../user.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';
import User from '@/module/user/domain/user/user.domain';
import UserMapper from '@/module/user/mappers/user.mapper';

@Injectable()
export class UserRepository extends BaseRepository<'userModel', User, UserModel> implements IUserRepository {
  mapper = UserMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('userModel', prisma, als);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.manager().findUnique({ where: { email } });
    return this.mapper.toDomainOrNull(user);
  }
}
