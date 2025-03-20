import { Module } from '@nestjs/common';
import { FindAnimalByIdController } from './findAnimalById.controller';
import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { FindAnimalByIdService } from './findAnimalById.service';

@Module({
  controllers: [FindAnimalByIdController],
  providers: [
    FindAnimalByIdService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class FindAnimalByIdModule {}
