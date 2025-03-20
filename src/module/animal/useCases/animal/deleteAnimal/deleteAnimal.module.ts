import { Module } from '@nestjs/common';
import { DeleteAnimalController } from './deleteAnimal.controller';
import { IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { AnimalRepository } from '@/repositories/prisma/animal.repository';
import { DeleteAnimalService } from './deleteAnimal.service';

@Module({
  controllers: [DeleteAnimalController],
  providers: [
    DeleteAnimalService,
    {
      provide: IAnimalRepositorySymbol,
      useClass: AnimalRepository,
    },
  ],
})
export class DeleteAnimalModule {}
