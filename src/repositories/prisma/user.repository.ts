import { Injectable } from '@nestjs/common';
import { Prisma, UserModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IUserRepository, ListUsersByAssociationIdQuery } from '../user.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';
import User from '@/module/user/domain/user/user.domain';
import UserMapper from '@/module/user/mappers/user.mapper';
import { PaginatedResult } from '../base.repository.interface';

@Injectable()
export class UserRepository extends BaseRepository<'userModel', User, UserModel> implements IUserRepository {
  mapper = UserMapper;
  usesSoftDelete = true;

  constructor(prisma: PrismaService, als: Als) {
    super('userModel', prisma, als);
  }

  async findCompleteById(id: string): Promise<User | null> {
    const user = await this.manager().findUnique({
      where: { id },
      include: {
        association: true,
      },
    });
    return this.mapper.toDomainOrNull(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.manager().findUnique({ where: { email } });
    return this.mapper.toDomainOrNull(user);
  }

  async listByAssociationId(query: ListUsersByAssociationIdQuery): Promise<PaginatedResult<User>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    let where: Prisma.UserModelWhereInput = { associationId: query.associationId };

    const [users, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: users.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
