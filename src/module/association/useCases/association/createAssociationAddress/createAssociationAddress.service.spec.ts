import { Test, TestingModule } from '@nestjs/testing';

import { CreateAssociationAddressService } from './createAssociationAddress.service';
import { CreateAssociationAddressDTO } from './dto/createAssociationAddress.dto';

import Address from '@/module/shared/domain/address.domain';
import { IAddressRepository, IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('CreateAssociationAddressService', () => {
  let service: CreateAssociationAddressService;
  let associationRepo: jest.Mocked<IAssociationRepository>;
  let addressRepo: jest.Mocked<IAddressRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAssociationAddressService,
        {
          provide: IAssociationRepositorySymbol,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: IAddressRepositorySymbol,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateAssociationAddressService>(CreateAssociationAddressService);
    associationRepo = module.get(IAssociationRepositorySymbol);
    addressRepo = module.get(IAddressRepositorySymbol);
  });

  it('should return NotFound error if association does not exist', async () => {
    const dto: CreateAssociationAddressDTO = {
      associationId: 'invalid-id',
      street: 'Test St',
      city: 'Test City',
    } as any;
    associationRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Associação com id invalid-id não encontrada' });
    expect(associationRepo.findById).toHaveBeenCalledWith('invalid-id');
  });

  it('should return error if Address.create fails', async () => {
    const dto: CreateAssociationAddressDTO = { associationId: 'valid-id', street: '', city: '' } as any;
    const associationMock = { id: 'valid-id', addressId: null };
    associationRepo.findById.mockResolvedValue(associationMock as any);
    jest.spyOn(Address, 'create').mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid address') as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(result).toMatchObject({ message: 'Invalid address' });
    expect(Address.create).toHaveBeenCalledWith({ street: '', city: '' });
  });

  it('should create address and update association successfully', async () => {
    const dto = {
      associationId: 'valid-id',
      street: 'Test St',
      city: 'Test City',
    };
    const associationMock = { id: 'valid-id', addressId: null };
    const addressMock = { id: 'address-id', street: 'Test St', city: 'Test City' };

    associationRepo.findById.mockResolvedValue(associationMock as any);
    jest.spyOn(Address, 'create').mockReturnValueOnce(addressMock as any);
    addressRepo.create.mockResolvedValue(addressMock as any);

    const result = await service.execute(dto as any);

    expect(result).toEqual(addressMock);
    expect(associationRepo.findById).toHaveBeenCalledWith('valid-id');
    expect(Address.create).toHaveBeenCalledWith({ street: 'Test St', city: 'Test City' });
    expect(addressRepo.create).toHaveBeenCalledWith(addressMock);
    expect(associationRepo.update).toHaveBeenCalledWith({ ...associationMock, addressId: 'address-id' });
  });
});
