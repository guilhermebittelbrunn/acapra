import { File } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

import { LocalFileStoreService } from '@/infra/services/implementations/localFileStore/localFileStore.service';
import { MAX_FILE_SIZE_MB } from '@/shared/utils/consts';

export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

/**
 * util to validate file types and sizes
 */
@Injectable()
export class FileValidatorInterceptor implements NestInterceptor {
  constructor(
    private readonly localFileStoreService: LocalFileStoreService,
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const files = request.files;

    if (!files) {
      throw new BadRequestException('no files uploaded.');
    }

    Object.entries(files).forEach(async ([key, fileArray]: [string, any]) => {
      fileArray.forEach(async (file: File) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          throw new BadRequestException(`invalid file type for ${key}. Allowed: PDF, JPG, PNG`);
        }

        if (file.size > MAX_FILE_SIZE) {
          throw new BadRequestException(`file ${key} exceeds max size of ${MAX_FILE_SIZE_MB}MB.`);
        }

        const filePath = await this.localFileStoreService.upload(file);
        request.files[key] = filePath;
      });
    });

    return next.handle();
  }
}
