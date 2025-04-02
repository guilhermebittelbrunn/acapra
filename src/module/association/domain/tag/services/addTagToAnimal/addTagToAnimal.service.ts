import { Inject, Injectable } from '@nestjs/common';

import TagAnimal from '../../tagAnimal.domain';

import Animal from '@/module/animal/domain/animal/animal.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import {
  ITagAnimalRepository,
  ITagAnimalRepositorySymbol,
} from '@/repositories/tagAnimal.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class AddTagToAnimalService {
  constructor(
    @Inject(ITagAnimalRepositorySymbol) private readonly tagAnimalRepo: ITagAnimalRepository,
    @Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository,
  ) {}

  async execute(animal: Animal, tagIds: string[]) {
    const tags = await this.tagRepo.findByIds(tagIds);

    if (!filledArray(tags)) {
      return new GenericErrors.NotFound('Nenhuma tag encontrada');
    }

    const tagsAnimals = await this.tagAnimalRepo.listByAnimalId(animal.id.toValue());

    const tagsToCreate = [];
    const tagsToDelete = tagsAnimals.filter((tagAnimal) => !tagIds.includes(tagAnimal.tagId.toValue()));

    for (const tag of tags) {
      const tagAnimalOrError = TagAnimal.create({
        animalId: animal.id,
        tagId: tag.id,
      });

      if (tagAnimalOrError instanceof GenericErrors.InvalidParam) {
        return tagAnimalOrError;
      }

      if (tagsAnimals.find((tagAnimal) => tagAnimal.tagId.equals(tag.id))) {
        continue;
      }
      tagsToCreate.push(tagAnimalOrError);
    }

    if (!filledArray(tagsToCreate)) {
      return new GenericErrors.InvalidParam('Nenhuma tag válida');
    }

    if (filledArray(tagsToDelete)) {
      const tagsToDeleteIds = tagsToDelete.map((tag) => tag.id.toValue());
      await this.tagAnimalRepo.deleteBulk(tagsToDeleteIds);
    }

    if (!filledArray(tagsToCreate)) {
      return [];
    }
    return this.tagAnimalRepo.createBulk(tagsToCreate);
  }
}
