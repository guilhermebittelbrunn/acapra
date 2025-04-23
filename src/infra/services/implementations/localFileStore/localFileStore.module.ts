import { Global, Module } from '@nestjs/common';

import { LocalFileStoreService } from './localFileStore.service';

@Global()
@Module({
  providers: [LocalFileStoreService],
  exports: [LocalFileStoreService],
})
export class LocalFileStoreModule {}
