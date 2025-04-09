import { Test, TestingModule } from '@nestjs/testing';

import { CreatePublicationService } from './createPublication.service';
import { CreatePublicationDTO } from './dto/createPublication.dto';

import Publication from '@/module/association/domain/publication.domain';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

describe('CreatePublicationService', () => {
  let service: CreatePublicationService;
  let publicationRepo: jest.Mocked<IPublicationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePublicationService,
        {
          provide: IPublicationRepositorySymbol,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreatePublicationService>(CreatePublicationService);
    publicationRepo = module.get<IPublicationRepository>(
      IPublicationRepositorySymbol,
    ) as jest.Mocked<IPublicationRepository>;
  });

  it('should create a publication successfully', async () => {
    const dto: CreatePublicationDTO = {
      title: 'Test Title',
      content: 'Test Content',
      associationId: '123',
    };

    const mockPublication = Publication.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
    });

    if (mockPublication instanceof GenericAppError) {
      throw new Error('Unexpected error during test setup');
    }

    publicationRepo.create.mockResolvedValue(mockPublication);

    await service.execute(dto);

    expect(publicationRepo.create).toHaveBeenCalled();
  });

  it('should return an error if publication creation fails', async () => {
    const dto: CreatePublicationDTO = {
      title: 'Test Title',
      content: 'Test Content',
      associationId: '123',
    };

    const mockError = new GenericErrors.InvalidParam('Invalid data');
    jest.spyOn(Publication, 'create').mockReturnValueOnce(mockError);

    const result = await service.execute(dto);

    expect(result).toBe(mockError);
    expect(publicationRepo.create).not.toHaveBeenCalled();
  });
});
