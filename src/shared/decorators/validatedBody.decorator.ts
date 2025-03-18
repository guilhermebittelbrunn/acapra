import { ValidationPipe, Body, ValidationPipeOptions } from '@nestjs/common';

export function ValidatedBody(options?: ValidationPipeOptions): ParameterDecorator {
  return Body(new ValidationPipe({ transform: true, whitelist: true, ...options }));
}
