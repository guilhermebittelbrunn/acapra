import { UserModel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import User from '../domain/user/user.domain';
import { UserDTO } from '../dto/user.dto';
import UserType from '../domain/user/userType.domain';
import { UserTypeEnum } from '@/shared/types/user';
import UserEmail from '../domain/user/userEmail.domain';
import UserPassword from '../domain/user/userPassword.domain';

export interface UserModelWithRelations extends UserModel {}

class BaseUserMapper extends Mapper<User, UserModelWithRelations, UserDTO> {
  toDomain(user: UserModelWithRelations): User {
    const userEmail = UserEmail.create(user.email);
    const userPassword = UserPassword.create({ value: user.password, hashed: true });
    const userType = UserType.create(user.type as UserTypeEnum);

    return User.create(
      {
        name: user.name,
        email: userEmail as UserEmail,
        password: userPassword as UserPassword,
        type: userType as UserType,
        deleted: user.deleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      new UniqueEntityID(user.id),
    );
  }
  async toPersistence(user: User): Promise<UserModelWithRelations> {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email.value,
      password: await user.password?.getHashedValue(),
      type: user.type.value,
      deleted: user.deleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as UserModelWithRelations;
  }
  toDTO(user: User): UserDTO {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email.value,
      type: user.type.value as UserTypeEnum,
    };
  }
}

const UserMapper = new BaseUserMapper();

export default UserMapper;
