import { Test, TestingModule } from '@nestjs/testing';

import { FindAdoptionByIdService } from './findAdoptionById.service';

import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('FindAdoptionByIdService', () => {
  let service: FindAdoptionByIdService;
  let adoptionRepo: jest.Mocked<IAdoptionRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAdoptionByIdService,
        {
          provide: IAdoptionRepositorySymbol,
          useValue: {
            findCompleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAdoptionByIdService>(FindAdoptionByIdService);
    adoptionRepo = module.get(IAdoptionRepositorySymbol);
  });

  it('should return adoption when found', async () => {
    const mockAdoption = { id: '1', name: 'Test Adoption' };
    adoptionRepo.findCompleteById.mockResolvedValue(mockAdoption as any);

    const result = await service.execute('1');

    expect(result).toEqual(mockAdoption);
    expect(adoptionRepo.findCompleteById).toHaveBeenCalledWith('1');
  });

  it('should return NotFound error when adoption is not found', async () => {
    adoptionRepo.findCompleteById.mockResolvedValue(null);

    const result = await service.execute('2');

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toBe({ message: 'Adoção com id 2 não encontrada' });
    expect(adoptionRepo.findCompleteById).toHaveBeenCalledWith('2');
  });
});
