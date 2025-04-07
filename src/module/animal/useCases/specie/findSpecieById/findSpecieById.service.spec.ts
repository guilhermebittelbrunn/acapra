import { Test, TestingModule } from '@nestjs/testing';

import { FindSpecieByIdService } from './findSpecieById.service';

import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('FindSpecieByIdService', () => {
  let service: FindSpecieByIdService;
  let specieRepository: jest.Mocked<ISpecieRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindSpecieByIdService,
        {
          provide: ISpecieRepositorySymbol,
          useValue: {
            findCompleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindSpecieByIdService>(FindSpecieByIdService);
    specieRepository = module.get<ISpecieRepository>(ISpecieRepositorySymbol) as jest.Mocked<ISpecieRepository>;
  });

  it('should return a specie when found', async () => {
    const mockSpecie = { id: '1', name: 'Lion' };
    specieRepository.findCompleteById.mockResolvedValue(mockSpecie as any);

    const result = await service.execute('1');

    expect(specieRepository.findCompleteById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockSpecie);
  });

  it('should return a NotFound error when specie is not found', async () => {
    specieRepository.findCompleteById.mockResolvedValue(null);

    const result = await service.execute('2');

    expect(specieRepository.findCompleteById).toHaveBeenCalledWith('2');
    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Espécie com id2 não encontrada' });
  });
});
