export interface UploadFilePayload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size?: number;
  destination?: string;
  filename?: string;
  path: string;
  buffer?: Buffer;
  stream?: NodeJS.ReadableStream;
}

export interface IFileStoreService {
  upload(file: UploadFilePayload): Promise<string>;
  uploadMany(files: UploadFilePayload[]): Promise<string[]>;
  delete(filePath: string): Promise<void>;
  deleteBulk(filePaths: string[]): Promise<void>;
}

export const IFileStoreServiceSymbol = Symbol('IFileStoreService');
