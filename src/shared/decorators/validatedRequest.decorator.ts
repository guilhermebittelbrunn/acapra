import {
  ValidationPipe,
  Body,
  ValidationPipeOptions,
  Query,
  Param,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';

export function ValidatedBody(options?: ValidationPipeOptions): ParameterDecorator {
  return Body(new ValidationPipe({ transform: true, whitelist: true, ...options }));
}

export function ValidatedQuery(options?: ValidationPipeOptions): ParameterDecorator {
  return Query(new ValidationPipe({ transform: true, ...options }));
}

interface ValidatedParamOptions extends ValidationPipeOptions {
  type?: 'uuid' | 'string' | 'number';
  message?: string;
}

export function ValidatedParams(param: string, options: ValidatedParamOptions = {}): ParameterDecorator {
  const { type = 'uuid', message, ...validationOptions } = options;

  const pipes = [];

  switch (type) {
    case 'string':
      pipes.push(
        new ValidationPipe({
          transform: true,
          transformOptions: { enableImplicitConversion: true },
          exceptionFactory: () =>
            new BadRequestException(message || `O parâmetro '${param}' deve ser um texto válido`),
          ...validationOptions,
        }),
      );
      break;

    case 'uuid':
      pipes.push(
        new ParseUUIDPipe({
          version: '4',
          errorHttpStatusCode: 400,
          ...validationOptions,
          exceptionFactory: () =>
            new BadRequestException(message || `O parâmetro '${param}' deve ser um UUID válido`),
        }),
      );
      break;
  }

  return Param(param, ...pipes);
}
