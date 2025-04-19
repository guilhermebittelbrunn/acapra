import { Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidCardNumber', async: false })
export class IsValidCardNumberConstraint implements ValidatorConstraintInterface {
  validate(cardNumber: string) {
    // remove all non-numeric characters
    const formatted = cardNumber.replace(/[^0-9]+/g, '');
    return this.isValidLuhn(formatted);
  }

  private isValidLuhn(cardNumber: string): boolean {
    // Regex to check if the card number is a number with 13 to 19 digits
    const regex = /^[0-9]{13,19}$/;
    if (!regex.test(cardNumber)) {
      return false;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  defaultMessage() {
    return 'número de cartão inválido';
  }
}

@ValidatorConstraint({ name: 'isValidExpirationMonth', async: false })
export class IsValidExpirationMonthConstraint implements ValidatorConstraintInterface {
  validate(month: string) {
    const monthNumber = parseInt(month, 10);
    return monthNumber >= 1 && monthNumber <= 12;
  }

  defaultMessage() {
    return 'mês de expiração inválido, insira um mês entre 01 e 12';
  }
}
@ValidatorConstraint({ name: 'isValidExpirationYear', async: false })
export class IsValidExpirationYearConstraint implements ValidatorConstraintInterface {
  validate(year: string) {
    const currentYear = new Date().getFullYear();
    return parseInt(year, 10) >= currentYear;
  }

  defaultMessage() {
    return 'ano de expiração inválido, insira um ano maior ou igual ao ano atual';
  }
}

@ValidatorConstraint({ name: 'isValidSecurityCode', async: false })
export class IsValidSecurityCodeConstraint implements ValidatorConstraintInterface {
  validate(securityCode: string) {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(securityCode);
  }

  defaultMessage() {
    return 'código de segurança inválido, insira um código de segurança com 3 ou 4 dígitos';
  }
}

export function ValidatedSecurityCode() {
  return Validate(IsValidSecurityCodeConstraint);
}

export function ValidatedExpirationYear() {
  return Validate(IsValidExpirationYearConstraint);
}

export function ValidatedCardNumber() {
  return Validate(IsValidCardNumberConstraint);
}

export function ValidatedExpirationMonth() {
  return Validate(IsValidExpirationMonthConstraint);
}
