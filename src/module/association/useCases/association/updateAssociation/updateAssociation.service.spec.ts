import { Test, TestingModule } from '@nestjs/testing';

import { UpdateAssociationDTO } from './dto/updateAssociation.dto';
import { UpdateAssociationService } from './updateAssociation.service';

import { Association } from '@/module/association/domain/association.domain';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('UpdateAssociationService', () => {
  let service: UpdateAssociationService;
  let mockAssociationRepo: jest.Mocked<IAssociationRepository>;

  beforeEach(async () => {
    mockAssociationRepo = {
      findById: jest.fn(),
      findByIdentifier: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IAssociationRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAssociationService,
        {
          provide: IAssociationRepositorySymbol,
          useValue: mockAssociationRepo,
        },
      ],
    }).compile();

    service = module.get<UpdateAssociationService>(UpdateAssociationService);
  });

  it('should return NotFound error if association does not exist', async () => {
    const dto: UpdateAssociationDTO = { id: 'non-existent-id', name: 'New Name' };
    mockAssociationRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: `Associação com id ${dto.id} não encontrada` });
    expect(mockAssociationRepo.findById).toHaveBeenCalledWith(dto.id);
  });

  it('should update the association with new data', async () => {
    const existingAssociation = Association.create(
      { name: 'Old Name' },
      new UniqueEntityID('existing-id'),
    ) as Association;
    const dto: UpdateAssociationDTO = { id: 'existing-id', name: 'New Name' };
    mockAssociationRepo.findById.mockResolvedValue(existingAssociation);
    mockAssociationRepo.update.mockResolvedValue(existingAssociation as any);

    const result = await service.execute(dto);

    expect(mockAssociationRepo.findById).toHaveBeenCalledWith(dto.id);
    expect(mockAssociationRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ props: { name: 'New Name' } }),
    );
    expect(result).toBe(existingAssociation);
  });

  it('should retain the old name if no new name is provided', async () => {
    const existingAssociation = Association.create({ name: 'Old Name' }, new UniqueEntityID('existing-id'));
    const dto: UpdateAssociationDTO = { id: 'existing-id', name: undefined };
    mockAssociationRepo.findById.mockResolvedValue(existingAssociation as any);
    mockAssociationRepo.update.mockResolvedValue(existingAssociation as any);

    const result = await service.execute(dto);

    expect(mockAssociationRepo.findById).toHaveBeenCalledWith(dto.id);
    expect(mockAssociationRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ props: { name: 'Old Name' } }),
    );
    expect(result).toBe(existingAssociation);
  });

  it('should return an error if Association.create fails', async () => {
    const existingAssociation = jest
      .spyOn(Association, 'create')
      .mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid data') as any);
    const dto: UpdateAssociationDTO = { id: 'any', name: '' };

    mockAssociationRepo.findById.mockResolvedValue(existingAssociation as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(mockAssociationRepo.update).not.toHaveBeenCalled();
  });

  it('should return Conflict error if association with the same name exists', async () => {
    const existingAssociation = Association.create({ name: 'same_name' }) as Association;
    const dto: UpdateAssociationDTO = { id: 'existing-id', name: 'same_name' }; // Invalid name

    mockAssociationRepo.findById.mockResolvedValue(existingAssociation as any);
    mockAssociationRepo.findByIdentifier.mockResolvedValue(existingAssociation as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(result).toMatchObject({
      message: `Já existe uma associação com esse nome: ${existingAssociation.name}`,
    });
    expect(mockAssociationRepo.update).not.toHaveBeenCalled();
  });
});
