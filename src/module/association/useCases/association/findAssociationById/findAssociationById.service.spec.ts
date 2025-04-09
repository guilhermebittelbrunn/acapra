import { Test, TestingModule } from '@nestjs/testing';

import { FindAssociationByIdService } from './findAssociationById.service';

import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('FindAssociationByIdService', () => {
  let service: FindAssociationByIdService;
  let associationRepo: jest.Mocked<IAssociationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAssociationByIdService,
        {
          provide: IAssociationRepositorySymbol,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAssociationByIdService>(FindAssociationByIdService);
    associationRepo = module.get(IAssociationRepositorySymbol);
  });

  it('should return the association when found', async () => {
    const mockAssociation = { id: '1', name: 'Test Association' };
    associationRepo.findById.mockResolvedValue(mockAssociation as any);

    const result = await service.execute('1');

    expect(result).toEqual(mockAssociation);
    expect(associationRepo.findById).toHaveBeenCalledWith('1');
  });

  it('should return a NotFound error when the association is not found', async () => {
    associationRepo.findById.mockResolvedValue(null);

    const result = await service.execute('1');

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Associação com id 1 não encontrada' });
    expect(associationRepo.findById).toHaveBeenCalledWith('1');
  });
});
