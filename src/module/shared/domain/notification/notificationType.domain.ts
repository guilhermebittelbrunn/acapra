import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { NotificationTypeEnum } from '@/shared/types/shared';

export interface NotificationTypeProps {
  value: NotificationTypeEnum;
}

export default class NotificationType extends ValueObject<NotificationTypeProps> {
  private constructor(value: NotificationTypeProps) {
    super(value);
  }

  get value(): NotificationTypeEnum {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(NotificationTypeEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: NotificationTypeEnum): NotificationType | GenericAppError {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: status, argumentName: 'tipo da notificação' },
    ]);

    if (!guardResult.succeeded) {
      return new GenericErrors.InvalidParam(guardResult.message);
    }

    const isValid = this.isValid(status);

    if (!isValid.succeeded) {
      return new GenericErrors.InvalidParam(isValid.message);
    }

    return new NotificationType({ value: status });
  }
}
