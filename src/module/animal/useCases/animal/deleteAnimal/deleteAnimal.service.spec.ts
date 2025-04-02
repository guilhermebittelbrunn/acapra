import { Test, TestingModule } from '@nestjs/testing';

import { DeleteAnimalService } from './deleteAnimal.service';

import Animal from '@/module/animal/domain/animal/animal.domain';
import AnimalStatus from '@/module/animal/domain/animal/animalStatus.domain';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { AnimalStatusEnum } from '@/shared/types/animal';

describe('DeleteAnimalService', () => {
  let service: DeleteAnimalService;
  let animalRepo: jest.Mocked<IAnimalRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAnimalService,
        {
          provide: IAnimalRepositorySymbol,
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteAnimalService>(DeleteAnimalService);
    animalRepo = module.get(IAnimalRepositorySymbol);
  });

  it('should throw NotFound error if animal does not exist', async () => {
    animalRepo.findById.mockResolvedValue(null);

    const result = await service.execute('non-existent-id');

    expect(result).toBeInstanceOf(GenericErrors.NotFound);
    expect(result.message).toBe('Animal com id non-existent-id não encontrado');
    expect(animalRepo.findById).toHaveBeenCalledWith('non-existent-id');
    expect(animalRepo.delete).not.toHaveBeenCalled();
  });

  it('should throw InvalidParam error if animal is adopted or in adoption', async () => {
    const id = UniqueEntityID.create();
    animalRepo.findById.mockResolvedValue({
      id,
      status: AnimalStatus.create(AnimalStatusEnum.IN_ADOPTION) as AnimalStatus,
    } as Animal);

    const result = await service.execute(id.toValue());

    expect(result).toBeInstanceOf(GenericErrors.InvalidParam);
    expect(result.message).toBe('Não é possível deletar um animal que está em adoção ou já foi adotado');
    expect(animalRepo.findById).toHaveBeenCalledWith(id.toValue());
    expect(animalRepo.delete).not.toHaveBeenCalled();
  });

  it('should delete the animal if it exists and is not adopted or in adoption', async () => {
    const id = UniqueEntityID.create();
    animalRepo.findById.mockResolvedValue({
      id,
      status: { value: AnimalStatusEnum.AVAILABLE },
    } as Animal);

    await service.execute(id.toValue());

    expect(animalRepo.findById).toHaveBeenCalledWith(id.toValue());
    expect(animalRepo.delete).toHaveBeenCalledWith(id.toValue());
  });
});
