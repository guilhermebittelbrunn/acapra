import { Test, TestingModule } from '@nestjs/testing';

import { UpdateSpecieDTO } from './dto/updateSpecie.dto';
import { UpdateSpecieService } from './updateSpecie.service';

import Specie from '@/module/animal/domain/specie.domain';
import SpecieBase from '@/module/animal/domain/specieBase.domain';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import {
  ISpecieBaseRepository,
  ISpecieBaseRepositorySymbol,
} from '@/repositories/specieBase.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('UpdateSpecieService', () => {
  let service: UpdateSpecieService;
  let specieRepo: jest.Mocked<ISpecieRepository>;
  let specieBaseRepo: jest.Mocked<ISpecieBaseRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSpecieService,
        {
          provide: ISpecieRepositorySymbol,
          useValue: {
            findById: jest.fn(),
            findByIdentifier: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: ISpecieBaseRepositorySymbol,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateSpecieService>(UpdateSpecieService);
    specieRepo = module.get(ISpecieRepositorySymbol);
    specieBaseRepo = module.get(ISpecieBaseRepositorySymbol);
  });

  it('should update a specie successfully', async () => {
    const dto: UpdateSpecieDTO = {
      id: 'specie-id',
      name: 'Updated Specie',
      sequence: 2,
      specieBaseId: 'specie-base-id',
      enabled: true,
    };
    const associationId = UniqueEntityID.create();

    const existingSpecie = Specie.create(
      {
        name: 'Original Specie',
        sequence: 1,
        associationId,
        specieBaseId: UniqueEntityID.create(),
        enabled: false,
      },
      new UniqueEntityID(dto.id),
    );

    const specieBase = SpecieBase.create({
      id: 'specie-base-id',
    } as any);

    specieRepo.findById.mockResolvedValue(existingSpecie as Specie);
    specieRepo.findByIdentifier.mockResolvedValue(null);
    specieBaseRepo.findById.mockResolvedValue(specieBase as any);
    specieRepo.update.mockResolvedValue('any string');

    const result = await service.execute(dto);

    expect(specieRepo.findById).toHaveBeenCalledWith(dto.id);
    expect(specieRepo.findByIdentifier).toHaveBeenCalledWith({
      name: dto.name,
      associationId: associationId.toValue(),
    });
    expect(specieBaseRepo.findById).toHaveBeenCalledWith(dto.specieBaseId);
    expect(specieRepo.update).toHaveBeenCalled();
    expect(typeof result).toEqual('string');
  });

  it('should return an error if the specie is not found', async () => {
    const dto: UpdateSpecieDTO = { id: 'non-existent-id' };

    specieRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Espécie com id non-existent-id não encontrada' });
  });

  it('should return an error if a specie with the same name already exists', async () => {
    const dto: UpdateSpecieDTO = { id: 'specie-id', name: 'Duplicate Specie' };

    const existingSpecie = Specie.create(
      {
        name: 'Original Specie',
        sequence: 1,
        associationId: UniqueEntityID.create(),
        specieBaseId: UniqueEntityID.create(),
        enabled: false,
      },
      UniqueEntityID.create('specie-id'),
    );

    const duplicateSpecie = Specie.create(
      {
        name: 'Duplicate Specie',
        sequence: 1,
        associationId: UniqueEntityID.create(),
        specieBaseId: UniqueEntityID.create(),
        enabled: false,
      },
      UniqueEntityID.create('duplicate-id'),
    );

    specieRepo.findById.mockResolvedValue(existingSpecie as any);
    specieRepo.findByIdentifier.mockResolvedValue(duplicateSpecie as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Espécie com nome Duplicate Specie já existe' });
  });

  it('should return an error if the specie base is not found', async () => {
    const dto: UpdateSpecieDTO = { id: 'specie-id', specieBaseId: 'non-existent-base-id' };

    const existingSpecie = Specie.create(
      {
        name: 'Original Specie',
        sequence: 1,
        associationId: UniqueEntityID.create(),
        specieBaseId: UniqueEntityID.create(),
        enabled: false,
      },
      UniqueEntityID.create('specie-id'),
    );

    specieRepo.findById.mockResolvedValue(existingSpecie as any);
    specieBaseRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Base de espécie com id non-existent-base-id não encontrada' });
  });
});
