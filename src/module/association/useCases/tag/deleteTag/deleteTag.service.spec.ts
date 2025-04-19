import { Test, TestingModule } from '@nestjs/testing';

import { DeleteTagService } from './deleteTag.service';

import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('DeleteTagService', () => {
  let service: DeleteTagService;
  let tagRepository: jest.Mocked<ITagRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTagService,
        {
          provide: ITagRepositorySymbol,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteTagService>(DeleteTagService);
    tagRepository = module.get<ITagRepository>(ITagRepositorySymbol) as jest.Mocked<ITagRepository>;
  });

  it('should delete a tag successfully', async () => {
    const tagId = 'valid-tag-id';
    tagRepository.delete.mockResolvedValue(true);

    await expect(service.execute(tagId)).resolves.toBeUndefined();
    expect(tagRepository.delete).toHaveBeenCalledWith(tagId);
    expect(tagRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should return a NotFound error if the tag does not exist', async () => {
    const tagId = 'non-existent-tag-id';
    tagRepository.delete.mockResolvedValue(false);

    const result = await service.execute(tagId);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result.message).toBe(`Etiqueta com id ${tagId} não encontrada`);
    expect(tagRepository.delete).toHaveBeenCalledWith(tagId);
    expect(tagRepository.delete).toHaveBeenCalledTimes(1);
  });
});
