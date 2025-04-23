import { Injectable } from '@nestjs/common';
import { PictureModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IPictureRepository } from '../picture.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Picture from '@/module/shared/domain/picture/picture.domain';
import Pictures from '@/module/shared/domain/picture/pictures.domain';
import PictureMapper from '@/module/shared/mappers/picture.mapper';
import { Als } from '@/shared/config/als/als.interface';
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class PictureRepository
  extends BaseRepository<'pictureModel', Picture, PictureModel>
  implements IPictureRepository
{
  mapper = PictureMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('pictureModel', prisma, als);
  }

  async saveMany(pictures: Pictures): Promise<void> {
    if (filledArray(pictures.newItems)) {
      await this.createBulk(pictures.newItems);
    }

    if (filledArray(pictures.removedItems)) {
      await this.deleteBulk(pictures.removedItems.map((p) => p.id.toValue()));
    }

    if (filledArray(pictures.updatedItems)) {
      await this.updateBulk(pictures.updatedItems);
    }
  }

  async findByAnimalId(animalId: string) {
    const pictures = await this.manager().findMany({
      where: { entityId: animalId },
    });

    return pictures.map(this.mapper.toDomain);
  }
}
