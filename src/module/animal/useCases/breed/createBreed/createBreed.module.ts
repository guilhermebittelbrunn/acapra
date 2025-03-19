import { Module } from '@nestjs/common';
import { CreateBreedService } from './createBreed.service';
import { CreateBreedController } from './createBreed.controller';
import { IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { BreedRepository } from '@/repositories/prisma/breed.repository';

@Module({
  controllers: [CreateBreedController],
  providers: [
    CreateBreedService,
    {
      provide: IBreedRepositorySymbol,
      useClass: BreedRepository,
    },
  ],
})
export class CreateBreedModule {}
