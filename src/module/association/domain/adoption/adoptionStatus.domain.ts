import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { AdoptionStatusEnum } from '@/shared/types/association';

export interface AdoptionStatusProps {
  value: AdoptionStatusEnum;
}

export default class AdoptionStatus extends ValueObject<AdoptionStatusProps> {
  private constructor(value: AdoptionStatusProps) {
    super(value);
  }

  get value(): AdoptionStatusEnum {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(AdoptionStatusEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: AdoptionStatusEnum): AdoptionStatus | GenericAppError {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: status, argumentName: 'status da adoção' },
    ]);

    if (!guardResult.succeeded) {
      return new GenericErrors.InvalidParam(guardResult.message);
    }

    const isValid = this.isValid(status);

    if (!isValid.succeeded) {
      return new GenericErrors.InvalidParam(isValid.message);
    }

    return new AdoptionStatus({ value: status });
  }
}
