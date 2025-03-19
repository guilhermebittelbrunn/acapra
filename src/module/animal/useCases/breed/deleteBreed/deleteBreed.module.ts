import { Module } from '@nestjs/common';
import { DeleteBreedController } from './deleteBreed.controller';
import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';
import { DeleteBreedService } from './deleteBreed.service';

@Module({
  controllers: [DeleteBreedController],
  providers: [
    DeleteBreedService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class DeleteBreedModule {}
