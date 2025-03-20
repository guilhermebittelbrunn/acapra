import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/**
 * Thanks to this interceptor, all responses will be wrapped in a data object.
 * Meta property can be used for pagination info, for example.
 */
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const { method, url, body, params, query } = context.switchToHttp().getRequest();
    // const payload = { method, url, body, params, query };

    return next.handle().pipe(
      map((response) => {
        if (!response) {
          return {
            data: [],
          };
        }

        if (response instanceof StreamableFile || Buffer.isBuffer(response)) {
          return response;
        }

        if (response.data && response.meta) {
          return {
            data: response.data,
            meta: response.meta,
          };
        }

        return { data: response };
      }),
      catchError((error) => {
        if (!isDev) {
          // this.loggerService.create({ error, payload });
        }

        if (error instanceof HttpException) {
          throw error;
        }

        throw new InternalServerErrorException();
      }),
    );
  }
}
