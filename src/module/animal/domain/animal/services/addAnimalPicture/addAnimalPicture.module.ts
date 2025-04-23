import { Module } from '@nestjs/common';

import { AddAnimalPictureService } from './addAnimalPicture.service';

import { IFileStoreServiceSymbol } from '@/infra/services/fileStore.interface';
import { S3StorageService } from '@/infra/services/implementations/aws/s3/s3-storage.service';
import { IPictureRepositorySymbol } from '@/repositories/picture.repository.interface';
import { PictureRepository } from '@/repositories/prisma/picture.repository';

@Module({
  providers: [
    AddAnimalPictureService,
    {
      provide: IPictureRepositorySymbol,
      useClass: PictureRepository,
    },
    {
      provide: IFileStoreServiceSymbol,
      useClass: S3StorageService,
    },
  ],
  exports: [AddAnimalPictureService],
})
export class AddAnimalPictureModule {}
