import { File } from '@nest-lab/fastify-multer';
import { Inject } from '@nestjs/common';

import Animal from '../../animal.domain';

import { IFileStoreService, IFileStoreServiceSymbol } from '@/infra/services/fileStore.interface';
import Picture from '@/module/shared/domain/picture/picture.domain';
import Pictures from '@/module/shared/domain/picture/pictures.domain';
import { IPictureRepository, IPictureRepositorySymbol } from '@/repositories/picture.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

export class AddAnimalPictureService {
  constructor(
    @Inject(IPictureRepositorySymbol)
    private readonly pictureRepository: IPictureRepository,
    @Inject(IFileStoreServiceSymbol)
    private readonly fileStoreService: IFileStoreService,
  ) {}

  async execute(animal: Animal, files: File[]) {
    const validatedFields = await this.validateAndFetchData(animal, files);
    if (validatedFields instanceof GenericAppError) {
      return validatedFields;
    }

    const picturesOrError = await this.buildPictures(animal, files);
    if (picturesOrError instanceof GenericAppError) {
      return picturesOrError;
    }

    await this.updateAnimalPicturesCollection(picturesOrError, animal.pictures);

    if (filledArray(animal.pictures.newItems)) {
      const results = await this.fileStoreService.uploadMany(
        animal.pictures.newItems.map((picture) => {
          return {
            fieldname: 'file',
            originalname: picture.originalName,
            encoding: picture.file.encoding,
            mimetype: picture.file.mimetype,
            buffer: picture.file.buffer,
            path: picture.path,
          };
        }),
      );

      animal.pictures.newItems.forEach((picture, index) => {
        picture.url = results[index];
      });
    }

    if (filledArray(animal.pictures.removedItems)) {
      await this.fileStoreService.deleteBulk(animal.pictures.removedItems.map((p) => p.path));
    }

    await this.pictureRepository.saveMany(animal.pictures);
  }

  private async validateAndFetchData(animal: Animal, files: File[]) {
    if (!filledArray(files)) {
      return new GenericErrors.InvalidParam('Nenhuma imagem informada');
    }

    const animalPictures = await this.pictureRepository.findByAnimalId(animal.id.toValue());

    animal.pictures = Pictures.create(animalPictures);
  }

  private async buildPictures(animal: Animal, files: File[]) {
    const pictures: Picture[] = [];

    for (const file of files) {
      const pictureOrError = Picture.create({
        ...file,
        entityId: animal.id,
        originalName: file.originalname,
        file: file,
      });

      if (pictureOrError instanceof GenericAppError) {
        return pictureOrError;
      }

      pictures.push(pictureOrError);
    }

    if (!filledArray(pictures)) {
      return new GenericErrors.InvalidParam('Nenhuma imagem válida informada');
    }

    return Pictures.create(pictures);
  }

  private async updateAnimalPicturesCollection(newPictures: Pictures, animalPictures: Pictures) {
    const picturesToSave = newPictures.items.filter((p) => !animalPictures.exists(p));
    const picturesToDelete = animalPictures.items.filter((p) => !newPictures.exists(p));

    animalPictures.remove(...picturesToDelete);
    animalPictures.add(...picturesToSave);
  }
}
