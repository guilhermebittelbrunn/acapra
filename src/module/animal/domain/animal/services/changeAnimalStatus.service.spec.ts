import { Test, TestingModule } from '@nestjs/testing';

import { ChangeAnimalStatusService } from './changeAnimalStatus.service';

import Animal from '../animal.domain';
import AnimalBreed from '../animalBreed.domain';
import AnimalGender from '../animalGender.domain';
import AnimalSize from '../animalSize.domain';
import AnimalStatus from '../animalStatus.domain';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalGenderEnum, AnimalSizeEnum, AnimalStatusEnum } from '@/shared/types/animal';

const makeAnimal = (overrides?: any) => {
  return new Animal({
    id: 'any_id',
    name: 'any_name',
    age: 1,
    associationId: UniqueEntityID.create(),
    specieId: UniqueEntityID.create(),
    gender: AnimalGender.create(AnimalGenderEnum.FEMALE) as AnimalGender,
    size: AnimalSize.create(AnimalSizeEnum.BIG) as AnimalSize,
    status: AnimalStatus.create(AnimalStatusEnum.AVAILABLE) as AnimalStatus,
    breed: AnimalBreed.create('any_breed') as AnimalBreed,
    ...overrides,
  });
};

describe('ChangeAnimalStatusService', () => {
  let service: ChangeAnimalStatusService;
  let animalRepository: jest.Mocked<IAnimalRepository>;

  beforeEach(async () => {
    animalRepository = {
      update: jest.fn(),
    } as unknown as jest.Mocked<IAnimalRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeAnimalStatusService,
        {
          provide: IAnimalRepositorySymbol,
          useValue: animalRepository,
        },
      ],
    }).compile();

    service = module.get<ChangeAnimalStatusService>(ChangeAnimalStatusService);

    jest.clearAllMocks();
  });

  it('should return an error if the new status is invalid', async () => {
    jest.spyOn(AnimalStatus, 'create').mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid status'));

    const animal = makeAnimal();
    const result = await service.execute(animal, 'INVALID_STATUS' as AnimalStatusEnum);

    expect(result).toBeInstanceOf(GenericAppError);
  });

  it('should return an error if the new status is the same as the current status', async () => {
    const animal = makeAnimal();

    const result = await service.execute(animal, AnimalStatusEnum.AVAILABLE);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'O status do animal já é o informado' });
  });

  it('should return an error if the animal is already adopted', async () => {
    const adoptedStatus = AnimalStatus.create(AnimalStatusEnum.ADOPTED) as AnimalStatus;
    const animal = makeAnimal({ status: adoptedStatus });

    const result = await service.execute(animal, AnimalStatusEnum.AVAILABLE);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Um animal adotado não pode ter seu status alterado' });
  });

  it('should update the animal status if all conditions are met', async () => {
    const currentStatus = AnimalStatus.create(AnimalStatusEnum.AVAILABLE) as AnimalStatus;
    const newStatus = AnimalStatus.create(AnimalStatusEnum.ADOPTED) as AnimalStatus;

    const animal = makeAnimal({ status: currentStatus });

    await service.execute(animal, newStatus.value);

    expect(animal.status.value).toBe(newStatus.value);
    expect(animalRepository.update).toHaveBeenCalled();
  });
});
