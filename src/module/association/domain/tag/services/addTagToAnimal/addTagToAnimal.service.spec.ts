import { Test, TestingModule } from '@nestjs/testing';

import { AddTagToAnimalService } from './addTagToAnimal.service';

import TagAnimal from '../../tagAnimal.domain';

import Animal from '@/module/animal/domain/animal/animal.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import {
  ITagAnimalRepository,
  ITagAnimalRepositorySymbol,
} from '@/repositories/tagAnimal.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('AddTagToAnimalService', () => {
  let service: AddTagToAnimalService;
  let tagAnimalRepo: jest.Mocked<ITagAnimalRepository>;
  let tagRepo: jest.Mocked<ITagRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddTagToAnimalService,
        {
          provide: ITagAnimalRepositorySymbol,
          useValue: {
            listByAnimalId: jest.fn(),
            deleteBulk: jest.fn(),
            createBulk: jest.fn(),
          },
        },
        {
          provide: ITagRepositorySymbol,
          useValue: {
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AddTagToAnimalService>(AddTagToAnimalService);
    tagAnimalRepo = module.get(ITagAnimalRepositorySymbol);
    tagRepo = module.get(ITagRepositorySymbol);
  });

  it('should return NotFound error if no tags are found', async () => {
    tagRepo.findByIds.mockResolvedValue([]);

    const animal = new Animal({ id: UniqueEntityID.create('animal-id') } as any);
    const result = await service.execute(animal, ['tag1', 'tag2']);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toEqual({ message: 'Nenhuma tag encontrada' });
  });

  it('should delete tags not included in the new tagIds', async () => {
    const existingTags = [
      { tagId: UniqueEntityID.create('tag1'), id: UniqueEntityID.create('tagAnimal1') },
      { tagId: UniqueEntityID.create('tag2'), id: UniqueEntityID.create('tagAnimal2') },
    ];
    const newTags = [{ id: UniqueEntityID.create('tag3') }];

    tagRepo.findByIds.mockResolvedValue(newTags as any);
    tagAnimalRepo.listByAnimalId.mockResolvedValue(existingTags as any);

    const animal = new Animal({ id: UniqueEntityID.create('animal-id') } as any);
    await service.execute(animal, ['tag3']);

    expect(tagAnimalRepo.deleteBulk).toHaveBeenCalledWith(['tagAnimal1', 'tagAnimal2']);
  });

  it('should create new tags for the animal', async () => {
    const existingTags = [];
    const newTags = [{ id: UniqueEntityID.create('tag1') }];

    tagRepo.findByIds.mockResolvedValue(newTags as any);
    tagAnimalRepo.listByAnimalId.mockResolvedValue(existingTags);

    const animal = new Animal({ id: UniqueEntityID.create('animal-id') } as any);
    const tagAnimalInstance = { isValid: true };
    jest.spyOn(TagAnimal, 'create').mockReturnValue(tagAnimalInstance as any);

    await service.execute(animal, ['tag1']);

    expect(tagAnimalRepo.createBulk).toHaveBeenCalledWith([tagAnimalInstance]);
  });

  it('should skip creating tags that already exist', async () => {
    const existingTags = [{ tagId: UniqueEntityID.create('tag1'), id: UniqueEntityID.create('tagAnimal1') }];
    const newTags = [{ id: UniqueEntityID.create('tag1') }];

    tagRepo.findByIds.mockResolvedValue(newTags as any);
    tagAnimalRepo.listByAnimalId.mockResolvedValue(existingTags as any);

    const animal = new Animal({ id: UniqueEntityID.create('animal-id') } as any);
    await service.execute(animal, ['tag1']);

    expect(tagAnimalRepo.createBulk).not.toHaveBeenCalled();
  });
});
