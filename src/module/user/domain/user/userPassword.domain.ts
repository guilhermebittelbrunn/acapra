import HashValueObject from '@/shared/core/domain/HashValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard from '@/shared/core/logic/guard';
import { SALT_ROUNDS } from '@/shared/utils/consts';

export interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

export default class UserPassword extends HashValueObject<IUserPasswordProps> {
  public static minLength = 6;

  private static userFriendlyName = 'senha';

  protected salt = SALT_ROUNDS;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserPasswordProps) {
    super(props);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  public static create(props: IUserPasswordProps): UserPassword | GenericAppError {
    const propsResult = Guard.againstNullOrUndefined(props.value, this.userFriendlyName);

    if (!propsResult.succeeded) {
      return new GenericErrors.InvalidParam(propsResult.message);
    }

    if (!props.hashed && !this.isAppropriateLength(props.value)) {
      new GenericErrors.InvalidParam(`${this.userFriendlyName} não tem os requisitos mínimos (6 caracteres).`);
    }

    return new UserPassword({
      value: props.value,
      hashed: !!props.hashed === true,
    });
  }
}
