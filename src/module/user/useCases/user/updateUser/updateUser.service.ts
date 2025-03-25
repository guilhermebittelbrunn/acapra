import { Inject, Injectable } from '@nestjs/common';

import { UpdateUserDTO } from './dto/updateUser.dto';

import User from '@/module/user/domain/user/user.domain';
import UserEmail from '@/module/user/domain/user/userEmail.domain';
import UserPassword from '@/module/user/domain/user/userPassword.domain';
import UserType from '@/module/user/domain/user/userType.domain';
import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateUserService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(dto: UpdateUserDTO) {
    const user = await this.userRepo.findById(dto.id);
    if (!user) {
      return new GenericErrors.NotFound(`Usuário com id ${dto.id} não encontrado`);
    }

    const buildedEntitiesOrError = await this.buildEntities(dto);
    if (buildedEntitiesOrError instanceof GenericAppError) {
      return buildedEntitiesOrError;
    }

    const { userType, userPassword, userEmail } = buildedEntitiesOrError;
    const userOrError = User.create(
      {
        ...user,
        name: coalesce(dto.name, user.name),
        email: coalesce(userEmail, user.email),
        password: coalesce(userPassword, user.password),
        type: coalesce(userType, user.type),
      },
      new UniqueEntityID(dto.id),
    );

    if (userOrError instanceof GenericAppError) {
      return userOrError;
    }

    return this.userRepo.update(userOrError);
  }

  private async buildEntities(dto: UpdateUserDTO) {
    let userType: UserType | undefined;
    let userPassword: UserPassword | undefined;
    let userEmail: UserEmail | undefined;

    if (dto.type) {
      const userTypeOrError = UserType.create(dto.type);
      if (userTypeOrError instanceof GenericAppError) {
        return userTypeOrError;
      }

      userType = userTypeOrError;
    }

    if (dto.password) {
      const userPasswordOrError = UserPassword.create({ value: dto.password, hashed: false });
      if (userPasswordOrError instanceof GenericAppError) {
        return userPasswordOrError;
      }

      userPassword = userPasswordOrError;
    }

    if (dto.email) {
      const userWithSameCredentials = await this.userRepo.findByEmail(dto.email);
      if (userWithSameCredentials) {
        return new GenericErrors.Conflict(`E-mail já em uso: ${dto.email}`);
      }

      const userEmailOrError = UserEmail.create(dto.email);
      if (userEmailOrError instanceof GenericAppError) {
        return userEmailOrError;
      }

      userEmail = userEmailOrError;
    }

    return { userType, userPassword, userEmail };
  }
}
