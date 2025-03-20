import {
  IsString,
  IsEmail,
  IsInt,
  IsBoolean,
  IsDate,
  IsNumber,
  IsUUID,
  ValidationOptions,
  MinLength,
  Min,
  Max,
  IsEnum,
  MaxLength,
} from 'class-validator';

/**
 * Valida se o valor é uma string.
 */
function ValidatedString(name: string, options?: ValidationOptions): PropertyDecorator {
  return IsString({ message: `${name} informado deve ser um texto.`, ...options });
}

/**
 * Valida se o valor é um e-mail válido.
 */
function ValidatedEmail(options?: ValidationOptions): PropertyDecorator {
  return IsEmail({}, { message: 'O e-mail informado não é válido.', ...options });
}

/**
 * Valida se o valor é um número inteiro.
 */
function ValidatedInt(name: string, options?: ValidationOptions): PropertyDecorator {
  return IsInt({ message: `${name} informado deve ser um número inteiro.`, ...options });
}

/**
 * Valida se o valor é um número (inteiro ou decimal).
 */
function ValidatedNumber(name: string, options?: ValidationOptions): PropertyDecorator {
  return IsNumber({}, { message: `${name} informado deve ser um número.`, ...options });
}

/**
 * Valida se o valor é um booleano (verdadeiro ou falso).
 */
function ValidatedBoolean(name: string, options?: ValidationOptions): PropertyDecorator {
  return IsBoolean({ message: `${name} informado deve ser verdadeiro ou falso.`, ...options });
}

/**
 * Valida se o valor é uma data válida.
 */
function ValidatedDate(name: string, options?: ValidationOptions): PropertyDecorator {
  return IsDate({ message: `${name} não é uma data válida.`, ...options });
}

/**
 * Valida se o valor é um UUID (identificador único universal).
 */
function ValidatedUUID(name: string, options?: ValidationOptions): PropertyDecorator {
  return IsUUID(undefined, { message: `identificador ${name} informado não é válido.`, ...options });
}

/**
 * Valida se o tamanho da string é maior ou igual ao valor informado.
 */
function ValidatedMinLength(name: string, length: number, options?: ValidationOptions): PropertyDecorator {
  return MinLength(length, {
    message: `${name} informado deve ter no um tamanho de no mínimo ${length}.`,
    ...options,
  });
}

/**
 * Valida se o tamanho da string é menor ou igual ao valor informado.
 */
function ValidatedMaxLength(name: string, length: number, options?: ValidationOptions): PropertyDecorator {
  return MaxLength(length, {
    message: `${name} informado deve ter no um tamanho de no máximo ${length}.`,
    ...options,
  });
}

/**
 * Valida se o valor é maior ou igual ao valor informado.
 */
function ValidatedMinValue(
  name: string,
  value: number,
  allowEqual = true,
  options?: ValidationOptions,
): PropertyDecorator {
  const isInteger = Number.isInteger(value);
  const validatedValue = allowEqual ? value : value + (isInteger ? 1 : 0.1);
  const message = `${name} informado deve ser maior ${allowEqual ? 'ou igual a' : 'que'} ${value}`;

  return Min(validatedValue, { message, ...options });
}

/**
 * Valida se o valor é menor ou igual ao valor informado.
 */
function ValidatedMaxValue(
  name: string,
  value: number,
  allowEqual = true,
  options?: ValidationOptions,
): PropertyDecorator {
  const isInteger = Number.isInteger(value);
  const validatedValue = allowEqual ? value : value - (isInteger ? 1 : 0.1);
  const message = `${name} informado deve ser menor ${allowEqual ? 'ou igual' : ''} a ${value}`;

  return Max(validatedValue, { message, ...options });
}

function ValidatedEnum(name: string, enumProperty: any, options?: ValidationOptions): PropertyDecorator {
  return IsEnum(enumProperty, {
    message: `${name} precisa ser um dos seguintes valores: ${Object.values(enumProperty).join(', ')}`,
    ...options,
  });
}

export {
  ValidatedString,
  ValidatedEmail,
  ValidatedInt,
  ValidatedNumber,
  ValidatedBoolean,
  ValidatedDate,
  ValidatedUUID,
  ValidatedMinLength,
  ValidatedMaxLength,
  ValidatedMinValue,
  ValidatedMaxValue,
  ValidatedEnum,
};
