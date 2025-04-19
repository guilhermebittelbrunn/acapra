import { Test, TestingModule } from '@nestjs/testing';

import { UpdateTagDTO } from './dto/updateTag.dto';
import { UpdateTagService } from './updateTag.service';

import Tag from '@/module/association/domain/tag/tag.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('UpdateTagService', () => {
  let service: UpdateTagService;
  let tagRepo: jest.Mocked<ITagRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTagService,
        {
          provide: ITagRepositorySymbol,
          useValue: {
            findById: jest.fn(),
            findByIdentifier: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateTagService>(UpdateTagService);
    tagRepo = module.get<ITagRepository>(ITagRepositorySymbol) as jest.Mocked<ITagRepository>;
  });

  it('should return NotFound error if tag does not exist', async () => {
    const dto: UpdateTagDTO = { id: 'nonexistent-id', name: 'New Name' };
    tagRepo.findById.mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: `Etiqueta com id ${dto.id} não encontrada` });
    expect(tagRepo.findById).toHaveBeenCalledWith(dto.id);
  });

  it('should return Conflict error if a tag with the same name already exists', async () => {
    const dto: UpdateTagDTO = { id: 'existing-id', name: 'Duplicate Name' };
    const existingTag = {
      id: 'existing-id',
      name: 'Old Name',
      associationId: { toValue: () => 'association-id' },
      enabled: true,
    };
    const duplicateTag = {
      id: 'duplicate-id',
      name: 'Duplicate Name',
      associationId: { toValue: () => 'association-id' },
    };

    tagRepo.findById.mockResolvedValue(existingTag as any);
    tagRepo.findByIdentifier.mockResolvedValue(duplicateTag as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.Conflict);
    expect(result).toMatchObject({ message: `Etiqueta com nome ${dto.name} já existe` });
    expect(tagRepo.findById).toHaveBeenCalledWith(dto.id);
    expect(tagRepo.findByIdentifier).toHaveBeenCalledWith({
      name: dto.name,
      associationId: 'association-id',
    });
  });

  it('should update the tag successfully', async () => {
    const dto: UpdateTagDTO = { id: 'existing-id', name: 'Updated Name', enabled: false };
    const existingTag = {
      id: 'existing-id',
      name: 'Old Name',
      associationId: { toValue: () => 'association-id' },
      enabled: true,
    };
    const updatedTag = Tag.create({
      name: 'Updated Name',
      associationId: existingTag.associationId,
      enabled: false,
    } as any);

    tagRepo.findById.mockResolvedValue(existingTag as any);
    tagRepo.findByIdentifier.mockResolvedValue(null);
    tagRepo.update.mockResolvedValue(updatedTag as any);

    const result = await service.execute(dto);

    expect(result).toEqual(updatedTag);
    expect(tagRepo.findById).toHaveBeenCalledWith(dto.id);
    expect(tagRepo.findByIdentifier).toHaveBeenCalledWith({
      name: dto.name,
      associationId: 'association-id',
    });
    expect(tagRepo.update).toHaveBeenCalled();
  });
});
