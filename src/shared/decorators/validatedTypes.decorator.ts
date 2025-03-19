import {
  IsString,
  IsEmail,
  IsInt,
  IsBoolean,
  IsDate,
  IsNumber,
  IsUUID,
  ValidationOptions,
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
  return IsUUID(undefined, { message: `O identificador ${name} informado não é válido.`, ...options });
}

function ValidatedMinLength(name: string, length: number, options?: ValidationOptions): PropertyDecorator {
  return IsString({ message: `${name} informado deve ter no mínimo ${length} caracteres.`, ...options });
}

function ValidatedMaxLength(name: string, length: number, options?: ValidationOptions): PropertyDecorator {
  return IsString({ message: `${name} informado deve ter no máximo ${length} caracteres.`, ...options });
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
};
