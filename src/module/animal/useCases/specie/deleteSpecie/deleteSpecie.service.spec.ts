import { Test, TestingModule } from '@nestjs/testing';

import { DeleteSpecieService } from './deleteSpecie.service';

import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('DeleteSpecieService', () => {
  let service: DeleteSpecieService;
  let specieRepository: jest.Mocked<ISpecieRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSpecieService,
        {
          provide: ISpecieRepositorySymbol,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteSpecieService>(DeleteSpecieService);
    specieRepository = module.get<ISpecieRepository>(ISpecieRepositorySymbol) as jest.Mocked<ISpecieRepository>;
  });

  it('should delete a specie successfully', async () => {
    const id = 'valid-id';
    specieRepository.delete.mockResolvedValue(true);

    await expect(service.execute(id)).resolves.toBeUndefined();
    expect(specieRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should return a NotFound error if the specie does not exist', async () => {
    const id = 'invalid-id';
    specieRepository.delete.mockResolvedValue(false);

    const result = await service.execute(id);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result.message).toBe(`Espécie com id${id} não encontrada`);
    expect(specieRepository.delete).toHaveBeenCalledWith(id);
  });
});
