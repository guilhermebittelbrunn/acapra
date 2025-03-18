import { ValidationPipe, ValidationPipeOptions, Query } from '@nestjs/common';

export function ValidatedQuery(options?: ValidationPipeOptions): ParameterDecorator {
  return Query(new ValidationPipe({ transform: true, ...options }));
}
