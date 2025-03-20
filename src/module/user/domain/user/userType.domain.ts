import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { UserTypeEnum } from '@/shared/types/user';

export interface UserTypeProps {
  value: UserTypeEnum;
}

export default class UserType extends ValueObject<UserTypeProps> {
  private constructor(value: UserTypeProps) {
    super(value);
  }

  get value(): UserTypeEnum {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(UserTypeEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: UserTypeEnum): UserType | GenericAppError {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: status, argumentName: 'tipo do usuário' },
    ]);

    if (!guardResult.succeeded) {
      return new GenericErrors.InvalidParam(guardResult.message);
    }

    const isValid = this.isValid(status);

    if (!isValid.succeeded) {
      return new GenericErrors.InvalidParam(isValid.message);
    }

    return new UserType({ value: status });
  }
}
