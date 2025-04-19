import { Test, TestingModule } from '@nestjs/testing';

import { RequestAdoptionDTO } from './dto/requestAdoption.dto';
import { RequestAdoptionService } from './requestAdoption.service';

import Adoption from '@/module/association/domain/adoption/adoption.domain';
import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('RequestAdoptionService', () => {
  let service: RequestAdoptionService;
  let adoptionRepoMock: jest.Mocked<IAdoptionRepository>;
  let animalRepoMock: jest.Mocked<IAnimalRepository>;

  beforeEach(async () => {
    adoptionRepoMock = {
      create: jest.fn(),
    } as any;

    animalRepoMock = {
      findById: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestAdoptionService,
        { provide: IAdoptionRepositorySymbol, useValue: adoptionRepoMock },
        { provide: IAnimalRepositorySymbol, useValue: animalRepoMock },
      ],
    }).compile();

    service = module.get<RequestAdoptionService>(RequestAdoptionService);
  });

  it('should return NotFound error if animal is not found', async () => {
    animalRepoMock.findById.mockResolvedValue(null);

    const dto: RequestAdoptionDTO = {
      animalId: 'non-existent-id',
      user: { id: 'user-id' },
      observation: 'Test observation',
    } as any;

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Animal com id non-existent-id não encontrado' });
    expect(animalRepoMock.findById).toHaveBeenCalledWith(dto.animalId);
  });

  it('should return InvalidParam error if animal is not available for adoption', async () => {
    animalRepoMock.findById.mockResolvedValue({
      id: UniqueEntityID.create('animal-id'),
      isAvailable: false,
    } as any);

    const dto: RequestAdoptionDTO = {
      animalId: 'animal-id',
      user: { id: UniqueEntityID.create('user-id') } as any,
      observation: 'Test observation',
    };

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Animal com id animal-id não está disponível para adoção' });
    expect(animalRepoMock.findById).toHaveBeenCalledWith(dto.animalId);
  });

  it('should return GenericAppError if Adoption.create fails', async () => {
    animalRepoMock.findById.mockResolvedValue({
      id: UniqueEntityID.create('animal-id'),
      isAvailable: true,
      associationId: UniqueEntityID.create('association-id'),
    } as any);

    jest.spyOn(Adoption, 'create').mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid adoption data'));

    const dto: RequestAdoptionDTO = {
      animalId: 'animal-id',
      user: { id: UniqueEntityID.create('user-id') },
      observation: 'Test observation',
    } as any;

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Invalid adoption data' });
    expect(animalRepoMock.findById).toHaveBeenCalledWith(dto.animalId);
  });

  it('should create an adoption successfully', async () => {
    animalRepoMock.findById.mockResolvedValue({
      id: UniqueEntityID.create('animal-id'),
      isAvailable: true,
      associationId: UniqueEntityID.create('association-id'),
    } as any);

    const adoptionMock = { id: 'adoption-id' } as any;
    jest.spyOn(Adoption, 'create').mockReturnValueOnce(adoptionMock as any);
    adoptionRepoMock.create.mockResolvedValue(adoptionMock);

    const dto: RequestAdoptionDTO = {
      animalId: UniqueEntityID.create('animal-id'),
      user: { id: 'user-id' },
      observation: 'Test observation',
    } as any;

    const result = await service.execute(dto);

    expect(result).toEqual(adoptionMock);
    expect(animalRepoMock.findById).toHaveBeenCalledWith(dto.animalId);
    expect(adoptionRepoMock.create).toHaveBeenCalledWith(adoptionMock);
  });
});
