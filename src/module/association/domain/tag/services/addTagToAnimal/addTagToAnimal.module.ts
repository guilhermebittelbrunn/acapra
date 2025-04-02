import { Module } from '@nestjs/common';

import { AddTagToAnimalService } from './addTagToAnimal.service';

import { TagRepository } from '@/repositories/prisma/tag.repository';
import { TagAnimalRepository } from '@/repositories/prisma/tagAnimal.repository';
import { ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import { ITagAnimalRepositorySymbol } from '@/repositories/tagAnimal.repository.interface';

@Module({
  providers: [
    AddTagToAnimalService,
    {
      provide: ITagAnimalRepositorySymbol,
      useClass: TagAnimalRepository,
    },
    {
      provide: ITagRepositorySymbol,
      useClass: TagRepository,
    },
  ],
  exports: [AddTagToAnimalService],
})
export class AddTagToAnimalModule {}
