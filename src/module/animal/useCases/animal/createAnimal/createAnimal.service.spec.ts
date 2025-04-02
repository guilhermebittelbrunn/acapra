import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateAnimalService } from './createAnimal.service';
import { CreateAnimalDTO } from './dto/createAnimal.dto';

import { AddTagToAnimalService } from '@/module/association/domain/tag/services/addTagToAnimal/addTagToAnimal.service';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalGenderEnum, AnimalSizeEnum } from '@/shared/types/animal';

describe('CreateAnimalService', () => {
  let service: CreateAnimalService;
  let animalRepo: jest.Mocked<IAnimalRepository>;
  let specieRepo: jest.Mocked<ISpecieRepository>;
  let publicationRepo: jest.Mocked<IPublicationRepository>;
  let addTagToAnimal: jest.Mocked<AddTagToAnimalService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAnimalService,
        {
          provide: IAnimalRepositorySymbol,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ISpecieRepositorySymbol,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: IPublicationRepositorySymbol,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: AddTagToAnimalService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateAnimalService>(CreateAnimalService);
    animalRepo = module.get(IAnimalRepositorySymbol);
    specieRepo = module.get(ISpecieRepositorySymbol);
    publicationRepo = module.get(IPublicationRepositorySymbol);
    addTagToAnimal = module.get(AddTagToAnimalService);
  });

  it('should create an animal successfully', async () => {
    const dto: CreateAnimalDTO = {
      name: faker.animal.petName(),
      age: faker.number.int(),
      associationId: 'association-id',
      specieId: 'specie-id',
      publicationId: 'publication-id',
      gender: AnimalGenderEnum.MALE,
      breed: 'labrador',
      size: AnimalSizeEnum.BIG,
      tagsIds: ['tag1', 'tag2'],
    };

    specieRepo.findById.mockResolvedValueOnce({} as any);
    publicationRepo.findById.mockResolvedValueOnce({} as any);
    animalRepo.create.mockResolvedValueOnce({ id: 'animal-id' } as any);

    const result = await service.execute(dto);

    expect(result).toEqual({ id: 'animal-id' });
    expect(specieRepo.findById).toHaveBeenCalledWith('specie-id');
    expect(publicationRepo.findById).toHaveBeenCalledWith('publication-id');
    expect(animalRepo.create).toHaveBeenCalled();
    expect(addTagToAnimal.execute).toHaveBeenCalledWith({ id: 'animal-id' }, ['tag1', 'tag2']);
  });

  it('should return an error if specie is not found', async () => {
    const dto: CreateAnimalDTO = {
      name: faker.animal.petName(),
      age: faker.number.int(),
      associationId: 'association-id',
      specieId: 'invalid-specie-id',
      publicationId: 'publication-id',
      gender: AnimalGenderEnum.MALE,
      breed: 'labrador',
      size: AnimalSizeEnum.BIG,
      tagsIds: [],
    };

    specieRepo.findById.mockResolvedValueOnce(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Espécie com id invalid-specie-id não encontrada' });
  });

  it('should return an error if publication is not found', async () => {
    const dto: CreateAnimalDTO = {
      name: faker.animal.petName(),
      age: faker.number.int(),
      associationId: 'association-id',
      specieId: 'specie-id',
      publicationId: 'invalid-publication-id',
      gender: AnimalGenderEnum.MALE,
      breed: 'labrador',
      size: AnimalSizeEnum.BIG,
      tagsIds: [],
    };

    specieRepo.findById.mockResolvedValueOnce({} as any);
    publicationRepo.findById.mockResolvedValueOnce(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Publicação com id invalid-publication-id não encontrada' });
  });

  it('should not add tags if tagsIds is empty', async () => {
    const dto: CreateAnimalDTO = {
      name: faker.animal.petName(),
      age: faker.number.int(),
      associationId: 'association-id',
      specieId: 'specie-id',
      publicationId: 'publication-id',
      gender: AnimalGenderEnum.MALE,
      breed: 'labrador',
      size: AnimalSizeEnum.BIG,
      tagsIds: [],
    };

    specieRepo.findById.mockResolvedValueOnce({} as any);
    publicationRepo.findById.mockResolvedValueOnce({} as any);
    animalRepo.create.mockResolvedValueOnce({ id: 'animal-id' } as any);

    const result = await service.execute(dto);

    expect(result).toEqual({ id: 'animal-id' });
    expect(addTagToAnimal.execute).not.toHaveBeenCalled();
  });
});
