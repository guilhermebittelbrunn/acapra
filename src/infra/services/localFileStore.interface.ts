import { File } from '@nest-lab/fastify-multer';

export interface ILocalFileStoreService {
  upload(file: File): Promise<string>;
  delete(filePath: string): Promise<void>;
  deleteBulk(filePaths: string[]): Promise<void>;
}

export const ILocalFileStoreServiceSymbol = Symbol('ILocalFileStoreService');
