import { Test, TestingModule } from '@nestjs/testing';

import { CreateAssociationService } from './createAssociation.service';
import { CreateAssociationDTO } from './dto/createAssociation.dto';

import { Association } from '@/module/association/domain/association.domain';
import { SignUpService } from '@/module/user/useCases/auth/signUp/signUp.service';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { UserTypeEnum } from '@/shared/types/user';

describe('CreateAssociationService', () => {
  let service: CreateAssociationService;
  let associationRepo: jest.Mocked<IAssociationRepository>;
  let signUpService: jest.Mocked<SignUpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAssociationService,
        {
          provide: IAssociationRepositorySymbol,
          useValue: {
            findByIdentifier: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: SignUpService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateAssociationService>(CreateAssociationService);
    associationRepo = module.get(IAssociationRepositorySymbol);
    signUpService = module.get(SignUpService);
  });

  it('should return conflict error if association with the same name exists', async () => {
    const dto: CreateAssociationDTO = {
      name: 'Test Association',
      email: 'test@example.com',
      password: 'password',
    };
    associationRepo.findByIdentifier.mockResolvedValueOnce({
      id: UniqueEntityID.create('1'),
      name: 'Test Association',
    } as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.Conflict);
    expect(result).toMatchObject({ message: 'Já existe uma associação com esse nome: Test Association' });
    expect(associationRepo.findByIdentifier).toHaveBeenCalledWith({ name: dto.name });
  });

  it('should return error if Association.create fails', async () => {
    const dto: CreateAssociationDTO = {
      name: 'Invalid Association',
      email: 'invalid@example.com',
      password: 'password',
    };
    jest
      .spyOn(Association, 'create')
      .mockReturnValueOnce(new GenericErrors.InvalidParam('Invalid data') as any);

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
    expect(result).toMatchObject({ message: 'Invalid data' });
    expect(signUpService.execute).not.toHaveBeenCalled();
  });

  it('should create an association and a user successfully', async () => {
    const dto: CreateAssociationDTO = {
      name: 'New Association',
      email: 'new@example.com',
      password: 'password',
    };
    const mockAssociation = { id: { toValue: () => '123' }, name: 'New Association' };
    associationRepo.findByIdentifier.mockResolvedValueOnce(null);
    jest.spyOn(Association, 'create').mockReturnValueOnce(mockAssociation as any);
    associationRepo.create.mockResolvedValueOnce(mockAssociation as any);

    const result = await service.execute(dto);

    expect(result).toEqual(mockAssociation);
    expect(associationRepo.findByIdentifier).toHaveBeenCalledWith({ name: dto.name });
    expect(associationRepo.create).toHaveBeenCalledWith(mockAssociation);
    expect(signUpService.execute).toHaveBeenCalledWith({
      ...dto,
      type: UserTypeEnum.PARTNER,
      associationId: '123',
    });
  });
});
