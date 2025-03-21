import ValueObject from '@/shared/core/domain/ValueObject';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { AnimalSizeEnum } from '@/shared/types/animal';

export interface AnimalSizeProps {
  value: AnimalSizeEnum;
}

export default class AnimalSize extends ValueObject<AnimalSizeProps> {
  private static userFriendlyName = 'tamanho';

  private constructor(value: AnimalSizeProps) {
    super(value);
  }

  get value(): AnimalSizeEnum {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(AnimalSizeEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: AnimalSizeEnum): AnimalSize | GenericAppError {
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

    return new AnimalSize({ value: status });
  }
}
