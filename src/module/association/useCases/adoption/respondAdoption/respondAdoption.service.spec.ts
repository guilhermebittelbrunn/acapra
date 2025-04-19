import { Test, TestingModule } from '@nestjs/testing';

import { RespondAdoptionDTO } from './dto/respondAdoption.dto';
import { RespondAdoptionService } from './respondAdoption.service';

import { ChangeAnimalStatusService } from '@/module/animal/domain/animal/services/changeAnimalStatus.service';
import Adoption from '@/module/association/domain/adoption/adoption.domain';
import AdoptionStatus from '@/module/association/domain/adoption/adoptionStatus.domain';
import { EmitNotificationService } from '@/module/shared/domain/notification/services/emitNotification/emitNotification.service';
import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalStatusEnum } from '@/shared/types/animal';
import { AdoptionStatusEnum } from '@/shared/types/association';

describe('RespondAdoptionService', () => {
  let service: RespondAdoptionService;
  let adoptionRepo: jest.Mocked<IAdoptionRepository>;
  let notificationService: jest.Mocked<EmitNotificationService>;
  let changeAnimalStatusService: jest.Mocked<ChangeAnimalStatusService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RespondAdoptionService,
        {
          provide: IAdoptionRepositorySymbol,
          useValue: {
            findCompleteById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: EmitNotificationService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ChangeAnimalStatusService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RespondAdoptionService>(RespondAdoptionService);
    adoptionRepo = module.get(IAdoptionRepositorySymbol);
    notificationService = module.get(EmitNotificationService);
    changeAnimalStatusService = module.get(ChangeAnimalStatusService);
  });

  it('should return NotFound error if adoption is not found', async () => {
    adoptionRepo.findCompleteById.mockResolvedValue(null);

    const dto: RespondAdoptionDTO = { id: '1', status: AdoptionStatusEnum.APPROVED, userId: 'user1' };
    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(adoptionRepo.findCompleteById).toHaveBeenCalledWith('1');
  });

  it('should return InvalidParam error if adoption is not pending', async () => {
    const adoption = { status: { value: AdoptionStatusEnum.APPROVED } } as Adoption;
    adoptionRepo.findCompleteById.mockResolvedValue(adoption);

    const dto: RespondAdoptionDTO = { id: '1', status: AdoptionStatusEnum.APPROVED, userId: 'user1' };
    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
  });

  it('should return error if new status creation fails', async () => {
    const adoption = { status: { value: AdoptionStatusEnum.PENDING } } as Adoption;
    adoptionRepo.findCompleteById.mockResolvedValue(adoption);

    jest.spyOn(AdoptionStatus, 'create').mockReturnValue(new GenericErrors.InvalidParam('Invalid status'));

    const dto: RespondAdoptionDTO = { id: '1', status: 'INVALID_STATUS', userId: 'user1' } as any;
    const result = await service.execute(dto);

    expect(result).toBeInstanceOf(GenericAppError);
  });

  it('should update adoption and send notification if approved', async () => {
    const adoption = {
      status: { value: AdoptionStatusEnum.PENDING },
      animal: { name: 'Dog' },
      requestedBy: { toValue: () => 'requester1' },
    } as unknown as Adoption;

    adoptionRepo.findCompleteById.mockResolvedValue(adoption);
    jest
      .spyOn(AdoptionStatus, 'create')
      .mockReturnValue({ value: AdoptionStatusEnum.APPROVED } as AdoptionStatus);
    changeAnimalStatusService.execute.mockResolvedValue(undefined);

    const dto: RespondAdoptionDTO = { id: '1', status: AdoptionStatusEnum.APPROVED, userId: 'user1' };
    await service.execute(dto);

    expect(changeAnimalStatusService.execute).toHaveBeenCalledWith(adoption.animal, AnimalStatusEnum.ADOPTED);
    expect(notificationService.execute).toHaveBeenCalledWith({
      userId: 'requester1',
      type: 'success',
      title: 'Adoção respondida',
      description: 'Sua solicitação de adoção para o animal Dog foi aprovada',
    });
    expect(adoptionRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: { value: AdoptionStatusEnum.APPROVED } }),
    );
  });

  it('should update adoption and send notification if rejected', async () => {
    const adoption = {
      status: { value: AdoptionStatusEnum.PENDING },
      animal: { name: 'Dog' },
      requestedBy: { toValue: () => 'requester1' },
    } as unknown as Adoption;

    adoptionRepo.findCompleteById.mockResolvedValue(adoption);
    jest
      .spyOn(AdoptionStatus, 'create')
      .mockReturnValue({ value: AdoptionStatusEnum.REJECTED } as AdoptionStatus);

    const dto: RespondAdoptionDTO = { id: '1', status: AdoptionStatusEnum.REJECTED, userId: 'user1' };
    await service.execute(dto);

    expect(changeAnimalStatusService.execute).not.toHaveBeenCalled();
    expect(notificationService.execute).toHaveBeenCalledWith({
      userId: 'requester1',
      type: 'warning',
      title: 'Adoção respondida',
      description: 'Sua solicitação de adoção para o animal Dog foi rejeitada',
    });
    expect(adoptionRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: { value: AdoptionStatusEnum.REJECTED } }),
    );
  });
});
