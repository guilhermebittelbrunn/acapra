import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { AnimalStatusEnum } from '@/shared/types/animal';

export interface AnimalStatusProps {
  value: AnimalStatusEnum;
}

export default class AnimalStatus extends ValueObject<AnimalStatusProps> {
  private constructor(value: AnimalStatusProps) {
    super(value);
  }

  get value(): AnimalStatusEnum {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(AnimalStatusEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: AnimalStatusEnum): AnimalStatus | GenericAppError {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: status, argumentName: 'status do animal' },
    ]);

    if (!guardResult.succeeded) {
      return new GenericErrors.InvalidParam(guardResult.message);
    }

    const isValid = this.isValid(status);

    if (!isValid.succeeded) {
      return new GenericErrors.InvalidParam(isValid.message);
    }

    return new AnimalStatus({ value: status });
  }
}
