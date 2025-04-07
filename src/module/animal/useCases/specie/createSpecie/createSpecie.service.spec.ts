import { Test, TestingModule } from '@nestjs/testing';

import { CreateSpecieService } from './createSpecie.service';
import { CreateSpecieDTO } from './dto/createSpecie.dto';

import Specie from '@/module/animal/domain/specie.domain';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('CreateSpecieService', () => {
  let service: CreateSpecieService;
  let specieRepo: jest.Mocked<ISpecieRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSpecieService,
        {
          provide: ISpecieRepositorySymbol,
          useValue: {
            findByIdentifier: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateSpecieService>(CreateSpecieService);
    specieRepo = module.get<ISpecieRepository>(ISpecieRepositorySymbol) as jest.Mocked<ISpecieRepository>;
  });

  it('should return a conflict error if a specie with the same name already exists', async () => {
    const dto: CreateSpecieDTO = {
      name: 'Lion',
      associationId: '1',
      specieBaseId: '2',
    };

    specieRepo.findByIdentifier.mockResolvedValueOnce({ id: 'existing-specie-id' } as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(result).toMatchObject({ message: 'Espécie com o nome Lion já cadastrada' });
  });

  it('should return an error if Specie.create fails', async () => {
    const dto: CreateSpecieDTO = {
      name: 'Lion',
      associationId: '1',
      specieBaseId: '2',
    };

    jest.spyOn(Specie, 'create').mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid data') as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(result).toMatchObject({ message: 'Invalid data' });
    expect(specieRepo.findByIdentifier).toHaveBeenCalledWith({
      name: dto.name,
      associationId: dto.associationId,
      specieBaseId: dto.specieBaseId,
    });
    expect(specieRepo.create).not.toHaveBeenCalled();
  });

  it('should create a new specie if no conflicts exist', async () => {
    const dto: CreateSpecieDTO = {
      name: 'Lion',
      associationId: '1',
      specieBaseId: '2',
    };

    specieRepo.findByIdentifier.mockResolvedValueOnce(null);

    const specieMock = Specie.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
      specieBaseId: new UniqueEntityID(dto.specieBaseId),
    });

    specieRepo.create.mockResolvedValueOnce(specieMock as any);

    const result = await service.execute(dto);

    expect(result).toBe(specieMock);
    expect(specieRepo.findByIdentifier).toHaveBeenCalled();
    expect(specieRepo.create).toHaveBeenCalled();
  });
});
