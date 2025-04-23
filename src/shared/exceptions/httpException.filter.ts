import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

import GenericAppError from '../core/logic/GenericAppError';
import GenericErrors from '../core/logic/GenericErrors';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let message = 'Erro interno do servidor';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof GenericAppError) {
      message = exception.message;
      statusCode = GenericErrors.getStatusCode(exception);
    }

    if (exception instanceof HttpException) {
      message = exception.getResponse() as string;
      statusCode = exception.getStatus();
    }

    if (exception instanceof AxiosError) {
      message = exception.response?.data;
      statusCode = exception.response?.status;
    }

    response.status(statusCode).send({ message, statusCode });
  }
}
