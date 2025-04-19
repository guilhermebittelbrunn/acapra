import { Test, TestingModule } from '@nestjs/testing';

import { CreateTagService } from './createTag.service';
import { CreateTagDTO } from './dto/createTag.dto';

import Tag from '@/module/association/domain/tag/tag.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('CreateTagService', () => {
  let service: CreateTagService;
  let tagRepo: jest.Mocked<ITagRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTagService,
        {
          provide: ITagRepositorySymbol,
          useValue: {
            findByIdentifier: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateTagService>(CreateTagService);
    tagRepo = module.get<ITagRepository>(ITagRepositorySymbol) as jest.Mocked<ITagRepository>;
  });

  it('should return a conflict error if a tag with the same name already exists', async () => {
    const dto: CreateTagDTO = { name: 'Test Tag', associationId: '123' };
    tagRepo.findByIdentifier.mockResolvedValueOnce({ id: '1', name: 'Test Tag', associationId: '123' } as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.Conflict);
    expect(result).toMatchObject({ message: 'Etiqueta com o nome Test Tag já cadastrada' });
    expect(tagRepo.findByIdentifier).toHaveBeenCalledWith({ name: 'Test Tag', associationId: '123' });
  });

  it('should return a GenericAppError if Tag creation fails', async () => {
    const dto: CreateTagDTO = { name: 'Invalid Tag', associationId: '123' };
    jest.spyOn(Tag, 'create').mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid tag data'));

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(result).toMatchObject({ message: 'Invalid tag data' });
    expect(tagRepo.findByIdentifier).toHaveBeenCalledWith({ name: 'Invalid Tag', associationId: '123' });
    expect(tagRepo.create).not.toHaveBeenCalled();
  });

  it('should create a new tag if no conflicts exist and data is valid', async () => {
    const dto: CreateTagDTO = { name: 'New Tag', associationId: '123' };
    const tag = Tag.create({
      name: 'New Tag',
      associationId: new UniqueEntityID('123'),
    });
    tagRepo.findByIdentifier.mockResolvedValueOnce(null);
    tagRepo.create.mockResolvedValueOnce(tag as any);

    const result = await service.execute(dto);

    expect(result).toEqual(tag);
    expect(tagRepo.findByIdentifier).toHaveBeenCalledWith({ name: 'New Tag', associationId: '123' });
    expect(tagRepo.create).toHaveBeenCalled();
  });
});
