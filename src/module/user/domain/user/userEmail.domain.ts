import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

export interface UserEmailProps {
  value: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string | null): email is string {
    if (!email) return false;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string | null): UserEmail | GenericAppError {
    if (!this.isValidEmail(email)) {
      return new GenericErrors.InvalidParam('E-mail inválido.');
    }

    return new UserEmail({ value: this.format(email) });
  }
}
