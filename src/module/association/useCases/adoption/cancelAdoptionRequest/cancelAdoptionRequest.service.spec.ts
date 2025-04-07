import { Test, TestingModule } from '@nestjs/testing';

import { CancelAdoptionRequestService } from './cancelAdoptionRequest.service';
import { CancelAdoptionRequestDTO } from './dto/cancelAdoptionRequest.dto';

import AdoptionStatus from '@/module/association/domain/adoption/adoptionStatus.domain';
import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AdoptionStatusEnum } from '@/shared/types/association';

describe('CancelAdoptionRequestService', () => {
  let service: CancelAdoptionRequestService;
  let adoptionRepo: jest.Mocked<IAdoptionRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelAdoptionRequestService,
        {
          provide: IAdoptionRepositorySymbol,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CancelAdoptionRequestService>(CancelAdoptionRequestService);
    adoptionRepo = module.get(IAdoptionRepositorySymbol);
  });

  it('should return an error if adoption is not found', async () => {
    adoptionRepo.findById.mockResolvedValue(null);
    const dto: CancelAdoptionRequestDTO = { id: '1', userId: 'user1' };

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result).toMatchObject({ message: 'Adoção com id 1 não encontrada' });
  });

  it('should return an error if user is not the requester', async () => {
    const adoption = {
      requestedBy: { equalsRaw: jest.fn().mockReturnValue(false) },
      status: { value: AdoptionStatusEnum.PENDING },
    };
    adoptionRepo.findById.mockResolvedValue(adoption as any);

    const dto: CancelAdoptionRequestDTO = { id: '1', userId: 'user1' };

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotAuthorized);
    expect(result).toMatchObject({ message: 'Você não tem permissão para cancelar esta adoção' });
  });

  it('should return an error if adoption is already canceled', async () => {
    const adoption = {
      requestedBy: { equalsRaw: jest.fn().mockReturnValue(true) },
      status: { value: AdoptionStatusEnum.CANCELED },
    };
    adoptionRepo.findById.mockResolvedValue(adoption as any);

    const dto: CancelAdoptionRequestDTO = { id: '1', userId: 'user1' };

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Solicitação de adoção já cancelada' });
  });

  it('should return an error if adoption is not pending', async () => {
    const adoption = {
      requestedBy: { equalsRaw: jest.fn().mockReturnValue(true) },
      status: { value: AdoptionStatusEnum.APPROVED },
    };
    adoptionRepo.findById.mockResolvedValue(adoption as any);

    const dto: CancelAdoptionRequestDTO = { id: '1', userId: 'user1' };

    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result).toMatchObject({ message: 'Não é possível cancelar uma adoção que não está pendente' });
  });

  it('should update adoption status to canceled if all conditions are met', async () => {
    const adoption = {
      requestedBy: { equalsRaw: jest.fn().mockReturnValue(true) },
      status: { value: AdoptionStatusEnum.PENDING },
    };
    adoptionRepo.findById.mockResolvedValue(adoption as any);
    adoptionRepo.update.mockResolvedValue(adoption as any);

    const dto: CancelAdoptionRequestDTO = { id: '1', userId: 'user1' };

    const result = await service.execute(dto);

    expect(result).toEqual(adoption);
    expect(adoptionRepo.findById).toHaveBeenCalledWith('1');
    expect(adoptionRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({
        status: expect.any(AdoptionStatus),
      }),
    );
  });
});
