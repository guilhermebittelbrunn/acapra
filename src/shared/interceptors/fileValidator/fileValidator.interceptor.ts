import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

/**
 * util to validate file types and sizes
 */
@Injectable()
export class FileValidatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const files = request.files;

    if (!files) {
      throw new BadRequestException('no files uploaded.');
    }

    Object.entries(files).forEach(([key, fileArray]: [string, any]) => {
      fileArray.forEach((file: File) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          throw new BadRequestException(`invalid file type for ${key}. Allowed: PDF, JPG, PNG`);
        }

        if (file.size > MAX_FILE_SIZE) {
          throw new BadRequestException(`file ${key} exceeds max size of ${MAX_FILE_SIZE_MB}MB.`);
        }
      });
    });

    return next.handle();
  }
}
