import { Injectable } from '@nestjs/common';
import { TagAnimalModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { ITagAnimalRepository } from '../tagAnimal.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import TagAnimal from '@/module/association/domain/tag/tagAnimal.domain';
import TagAnimalMapper from '@/module/association/mappers/tagAnimal.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class TagAnimalRepository
  extends BaseRepository<'tagAnimalModel', TagAnimal, TagAnimalModel>
  implements ITagAnimalRepository
{
  mapper = TagAnimalMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('tagAnimalModel', prisma, als);
  }

  async listByAnimalId(animalId: string) {
    const tagsAnimals = await this.manager().findMany({
      where: { animalId },
    });

    return tagsAnimals?.map(this.mapper.toDomain);
  }
}
