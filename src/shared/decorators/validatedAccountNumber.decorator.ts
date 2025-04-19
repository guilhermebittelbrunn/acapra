import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const specialCharactersRegex = /\D/g;

@ValidatorConstraint({ name: 'isValidAccountNumber', async: false })
class IsValidAccountNumberConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value !== 'string') return false;
    const cleanedValue = value.replace(specialCharactersRegex, '');
    return cleanedValue.length >= 5 && cleanedValue.length <= 12;
  }

  defaultMessage() {
    return 'número da conta deve conter entre 5 e 12 dígitos com DV (XXXXX-X)';
  }
}

/**
 * Custom decorator to validate and sanitize accountNumber, formatting it as XXXXX-X
 */
export function ValidatedAccountNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidAccountNumberConstraint,
    });

    Transform(({ value }) => {
      const cleanedValue = value.replace(specialCharactersRegex, '');
      if (cleanedValue.length < 2) {
        return cleanedValue;
      }
      return cleanedValue.slice(0, -1) + '-' + cleanedValue.slice(-1);
    })(object, propertyName);
  };
}
