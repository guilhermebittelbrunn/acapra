import { HttpException, HttpStatus } from '@nestjs/common';

import GenericAppError from './GenericAppError';
import GenericErrors from './GenericErrors';

export class GenericException extends HttpException {
  constructor(error: GenericAppError | string, status?: HttpStatus) {
    if (error instanceof GenericAppError) {
      super(error.message, GenericErrors.getStatusCode(error));
      return;
    }
    super(error, status ?? HttpStatus.BAD_REQUEST);
  }
}
