import { Test, TestingModule } from '@nestjs/testing';

import { FindAnimalByIdService } from './findAnimalById.service';

import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('FindAnimalByIdService', () => {
  let service: FindAnimalByIdService;
  let animalRepository: jest.Mocked<IAnimalRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAnimalByIdService,
        {
          provide: IAnimalRepositorySymbol,
          useValue: {
            findCompleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAnimalByIdService>(FindAnimalByIdService);
    animalRepository = module.get(IAnimalRepositorySymbol);
  });

  it('should return an animal when found', async () => {
    const id = UniqueEntityID.create().toValue();
    const mockAnimal = { id, name: 'Lion' } as any;
    animalRepository.findCompleteById.mockResolvedValue(mockAnimal);

    const result = await service.execute(id);

    expect(animalRepository.findCompleteById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockAnimal);
  });

  it('should return a NotFound error when animal is not found', async () => {
    animalRepository.findCompleteById.mockResolvedValue(null);

    const result = await service.execute('2');

    expect(animalRepository.findCompleteById).toHaveBeenCalledWith('2');
    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Animal com id2 não encontrada' });
  });
});
