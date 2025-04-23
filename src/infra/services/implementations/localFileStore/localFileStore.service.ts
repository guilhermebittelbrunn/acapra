import { File } from '@nest-lab/fastify-multer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';

import { ILocalFileStoreService } from '@/infra/services/localFileStore.interface';

@Injectable()
export class LocalFileStoreService implements ILocalFileStoreService {
  constructor(private readonly configService: ConfigService) {}

  async upload(file: File) {
    const filePath = `${this.configService.getOrThrow('localFileStore.path')}/${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }

  async delete(filePath: string) {
    fs.unlinkSync(filePath);
  }

  async deleteBulk(filePaths: string[]) {
    filePaths.forEach((filePath) => this.delete(filePath));
  }
}
