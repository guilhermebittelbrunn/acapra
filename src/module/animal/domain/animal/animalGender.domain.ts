import ValueObject from '@/shared/core/domain/ValueObject';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { AnimalGenderEnum } from '@/shared/types/animal';

export interface AnimalGenderProps {
  value: AnimalGenderEnum;
}

export default class AnimalGender extends ValueObject<AnimalGenderProps> {
  private static userFriendlyName = 'genêro';

  private constructor(value: AnimalGenderProps) {
    super(value);
  }

  get value(): AnimalGenderEnum {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(AnimalGenderEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: AnimalGenderEnum): AnimalGender | GenericAppError {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: status, argumentName: `${this.userFriendlyName} do animal` },
    ]);

    if (!guardResult.succeeded) {
      return new GenericErrors.InvalidParam(guardResult.message);
    }

    const isValid = this.isValid(status);

    if (!isValid.succeeded) {
      return new GenericErrors.InvalidParam(isValid.message);
    }

    return new AnimalGender({ value: status });
  }
}
