import { Test, TestingModule } from '@nestjs/testing';

import { AddAnimalPictureService } from './addAnimalPicture.service';

import Animal from '../../animal.domain';

import { IFileStoreService, IFileStoreServiceSymbol } from '@/infra/services/fileStore.interface';
import Picture from '@/module/shared/domain/picture/picture.domain';
import Pictures from '@/module/shared/domain/picture/pictures.domain';
import { IPictureRepository, IPictureRepositorySymbol } from '@/repositories/picture.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';

const makeAnimal = (overrides?: any) => {
  return new Animal({
    id: UniqueEntityID.create(),
    name: 'any_name',
    age: 1,
    associationId: UniqueEntityID.create(),
    specieId: UniqueEntityID.create(),
    ...overrides,
  });
};

const makeFile = (overrides?: any) => {
  return {
    fieldname: 'file',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: Buffer.from('test'),
    ...overrides,
  };
};

describe('AddAnimalPictureService', () => {
  let service: AddAnimalPictureService;
  let pictureRepository: jest.Mocked<IPictureRepository>;
  let fileStoreService: jest.Mocked<IFileStoreService>;

  beforeEach(async () => {
    pictureRepository = {
      findByAnimalId: jest.fn(),
      saveMany: jest.fn(),
    } as unknown as jest.Mocked<IPictureRepository>;

    fileStoreService = {
      uploadMany: jest.fn(),
      deleteBulk: jest.fn(),
    } as unknown as jest.Mocked<IFileStoreService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddAnimalPictureService,
        {
          provide: IPictureRepositorySymbol,
          useValue: pictureRepository,
        },
        {
          provide: IFileStoreServiceSymbol,
          useValue: fileStoreService,
        },
      ],
    }).compile();

    service = module.get<AddAnimalPictureService>(AddAnimalPictureService);

    jest.clearAllMocks();
  });

  it('should return an error if no files are provided', async () => {
    const animal = makeAnimal();
    const result = await service.execute(animal, []);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Nenhuma imagem informada' });
  });

  it('should return an error if no valid pictures are created', async () => {
    const animal = makeAnimal();
    const file = makeFile();
    jest.spyOn(Picture, 'create').mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid picture'));

    const result = await service.execute(animal, [file]);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Invalid picture' });
  });

  it('should add pictures to animal and save them', async () => {
    const animal = makeAnimal();
    const file = makeFile();

    pictureRepository.findByAnimalId.mockResolvedValueOnce([]);
    fileStoreService.uploadMany.mockResolvedValueOnce(['http://test.com/image.jpg']);

    await service.execute(animal, [file]);

    expect(pictureRepository.findByAnimalId).toHaveBeenCalledWith(animal.id.toValue());
    expect(fileStoreService.uploadMany).toHaveBeenCalled();
    expect(pictureRepository.saveMany).toHaveBeenCalledWith(expect.any(Pictures));
  });

  it('should remove old pictures and add new ones', async () => {
    const animal = makeAnimal();
    const oldPicture = Picture.create({
      ...makeFile(),
      entityId: animal.id,
      originalName: 'old.jpg',
      file: makeFile(),
    }) as Picture;

    pictureRepository.findByAnimalId.mockResolvedValueOnce([oldPicture]);
    fileStoreService.uploadMany.mockResolvedValueOnce(['http://test.com/new.jpg']);
    fileStoreService.deleteBulk.mockResolvedValueOnce();

    await service.execute(animal, [makeFile()]);

    expect(fileStoreService.deleteBulk).toHaveBeenCalledWith([oldPicture.path]);
    expect(fileStoreService.uploadMany).toHaveBeenCalled();
    expect(pictureRepository.saveMany).toHaveBeenCalledWith(expect.any(Pictures));
  });
});
