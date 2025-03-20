import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { GenericException } from '@/shared/core/logic/GenericException';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import UserPassword from '@/module/user/domain/user/userPassword.domain';
import UserEmail from '@/module/user/domain/user/userEmail.domain';
import UserType from '@/module/user/domain/user/userType.domain';
import User from '@/module/user/domain/user/user.domain';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

@Injectable()
export class UpdateUserService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(dto: UpdateUserDTO) {
    const user = await this.userRepo.findById(dto.id);

    if (!user) {
      throw new GenericException(`Usuário com id ${dto.id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    const { userType, userPassword, userEmail } = await this.buildEntities(dto);

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
      throw new GenericException(userOrError);
    }

    const rawId = await this.userRepo.update(userOrError);
    return rawId;
  }

  private async buildEntities(dto: UpdateUserDTO) {
    let userType: UserType | undefined;
    let userPassword: UserPassword | undefined;
    let userEmail: UserEmail | undefined;

    if (dto.type) {
      const userTypeOrError = UserType.create(dto.type);

      if (userTypeOrError instanceof GenericAppError) {
        throw new GenericException(userTypeOrError);
      }

      userType = userTypeOrError;
    }

    if (dto.password) {
      const userPasswordOrError = UserPassword.create({ value: dto.password, hashed: false });

      if (userPasswordOrError instanceof GenericAppError) {
        throw new GenericException(userPasswordOrError);
      }

      userPassword = userPasswordOrError;
    }

    if (dto.email) {
      const userWithSameCredentials = await this.userRepo.findByEmail(dto.email);

      if (userWithSameCredentials) {
        throw new GenericException(`E-mail já em uso: ${dto.email}`, HttpStatus.CONFLICT);
      }

      const userEmailOrError = UserEmail.create(dto.email);

      if (userEmailOrError instanceof GenericAppError) {
        throw new GenericException(userEmailOrError);
      }

      userEmail = userEmailOrError;
    }

    return { userType, userPassword, userEmail };
  }
}
