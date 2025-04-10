import { UserModel } from '@prisma/client';

import UserEmail from './userEmail.domain';
import UserPassword from './userPassword.domain';
import UserType from './userType.domain';

import { Association } from '@/module/association/domain/association.domain';
import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard from '@/shared/core/logic/guard';
import { PartialAutoGenerated } from '@/shared/types/common';
import { UserTypeEnum } from '@/shared/types/user';

interface IUserProps
  extends PartialAutoGenerated<
    Partial<Omit<UserModel, 'type' | 'email' | 'password' | 'associationId' | 'addressId'>>
  > {
  associationId?: UniqueEntityID;
  addressId?: UniqueEntityID;
  type: UserType;
  email: UserEmail;
  password: UserPassword;

  association?: Association;
}

export default class User extends Entity<IUserProps> {
  constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get associationId(): UniqueEntityID | null | undefined {
    return this.props.associationId;
  }

  get addressId(): UniqueEntityID | null | undefined {
    return this.props.addressId;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get type(): UserType {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deleted(): boolean {
    return this.props.deleted;
  }

  get association(): Association {
    return this.props.association;
  }

  public static create(props: IUserProps, id?: UniqueEntityID): User | GenericAppError {
    const guardedProps = Guard.againstNullOrUndefinedBulk([{ argument: props.name, argumentName: 'nome' }]);

    if (!guardedProps.succeeded) {
      return new GenericErrors.InvalidParam(guardedProps.message);
    }

    const propsWithDefault = {
      type: UserType.create(UserTypeEnum.USER),
      ...props,
    };

    return new User(propsWithDefault, id);
  }
}
