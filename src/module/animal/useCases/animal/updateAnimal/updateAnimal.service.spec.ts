import { Test, TestingModule } from '@nestjs/testing';

import { UpdateAnimalDTO } from './dto/updateAnimal.dto';
import { UpdateAnimalService } from './updateAnimal.service';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalGender from '@/module/animal/domain/animal/animalGender.domain';
import AnimalStatus from '@/module/animal/domain/animal/animalStatus.domain';
import { AddTagToAnimalService } from '@/module/association/domain/tag/services/addTagToAnimal/addTagToAnimal.service';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalGenderEnum, AnimalStatusEnum } from '@/shared/types/animal';

describe('UpdateAnimalService', () => {
  let service: UpdateAnimalService;
  let animalRepo: jest.Mocked<IAnimalRepository>;
  let specieRepo: jest.Mocked<ISpecieRepository>;
  let publicationRepo: jest.Mocked<IPublicationRepository>;
  let addTagToAnimal: jest.Mocked<AddTagToAnimalService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAnimalService,
        {
          provide: IAnimalRepositorySymbol,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
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

    service = module.get<UpdateAnimalService>(UpdateAnimalService);
    animalRepo = module.get(IAnimalRepositorySymbol);
    specieRepo = module.get(ISpecieRepositorySymbol);
    publicationRepo = module.get(IPublicationRepositorySymbol);
    addTagToAnimal = module.get(AddTagToAnimalService);
  });

  it('should return NotFound error if animal is not found', async () => {
    const dto: UpdateAnimalDTO = { id: '1' };
    animalRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Animal com id 1 não encontrado' });
  });

  it('should return NotFound error if specie is not found', async () => {
    const id = UniqueEntityID.create();
    const dto: UpdateAnimalDTO = { id: id.toValue(), specieId: '2' };
    animalRepo.findById.mockResolvedValue({ id } as Animal);
    specieRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Espécie com id 2 não encontrada' });
  });

  it('should return NotFound error if publication is not found', async () => {
    const id = UniqueEntityID.create();
    const dto: UpdateAnimalDTO = { id: id.toValue(), publicationId: '3' };
    animalRepo.findById.mockResolvedValue({ id } as Animal);
    publicationRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Publicação com id 3 não encontrada' });
  });

  it('should update the animal successfully', async () => {
    const dto: UpdateAnimalDTO = {
      id: '1',
      associationId: 'association-id',
      name: 'Updated Animal',
      gender: AnimalGenderEnum.MALE,
      status: AnimalStatusEnum.AVAILABLE,
      tagsIds: ['tag1', 'tag2'],
      specieId: 'specie-id',
    };
    const existingAnimal = {
      id: '1',
      name: 'Old Animal',
      gender: 'Female',
      status: 'Sick',
      associationId: 'association-id',
      specieId: 'specie-id',
    };
    animalRepo.findById.mockResolvedValue(existingAnimal as any);
    specieRepo.findById.mockResolvedValue({} as any);
    animalRepo.update.mockResolvedValue({ ...existingAnimal, ...dto } as any);
    AnimalGender.create = jest.fn().mockReturnValue(dto.gender);
    AnimalStatus.create = jest.fn().mockReturnValue(dto.status);

    const result = await service.execute(dto);

    expect(result).toEqual({ ...existingAnimal, ...dto });
    expect(animalRepo.update).toHaveBeenCalledWith(expect.objectContaining({ name: 'Updated Animal' }));
    expect(addTagToAnimal.execute).toHaveBeenCalledWith(expect.any(Object), ['tag1', 'tag2']);
  });

  it('should handle errors during entity creation', async () => {
    const dto: UpdateAnimalDTO = { id: '1', gender: 'InvalidGender' as AnimalGenderEnum };
    const existingAnimal = { id: '1' };
    animalRepo.findById.mockResolvedValue(existingAnimal as any);
    AnimalGender.create = jest.fn().mockReturnValue(new GenericErrors.InvalidParam('Invalid gender'));

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Invalid gender' });
  });
});
