import { UserModel } from '@prisma/client';

import User from '../domain/user/user.domain';
import UserEmail from '../domain/user/userEmail.domain';
import UserPassword from '../domain/user/userPassword.domain';
import UserType from '../domain/user/userType.domain';
import { UserDTO } from '../dto/user.dto';

import AssociationMapper, {
  AssociationModelWithRelations,
} from '@/module/association/mappers/association.mapper';
import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { UserTypeEnum } from '@/shared/types/user';

export interface UserModelWithRelations extends UserModel {
  association?: AssociationModelWithRelations;
}

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
        associationId: UniqueEntityID.createOrUndefined(user.associationId),
        type: userType as UserType,
        deleted: user.deleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        association: AssociationMapper.toDomainOrUndefined(user?.association),
      },
      new UniqueEntityID(user.id),
    ) as User;
  }
  async toPersistence(user: User): Promise<UserModelWithRelations> {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email.value,
      associationId: user.associationId?.toValue(),
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
      associationId: user.associationId?.toValue(),
      name: user.name,
      email: user.email.value,
      type: user.type.value as UserTypeEnum,
      association: AssociationMapper.toDTOOrUndefined(user?.association),
    };
  }
}

const UserMapper = new BaseUserMapper();

export default UserMapper;
