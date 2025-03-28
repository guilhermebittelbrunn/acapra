import { Inject, Injectable } from '@nestjs/common';

import { RequestAdoptionDTO } from './dto/requestAdoption.dto';

import Adoption from '@/module/association/domain/adoption/adoption.domain';
import { IAdoptionRepository, IAdoptionRepositorySymbol } from '@/repositories/adoption.repository.interface';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class RequestAdoptionService {
  constructor(
    @Inject(IAdoptionRepositorySymbol) private readonly adoptionRepo: IAdoptionRepository,
    @Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository,
  ) {}

  async execute(dto: RequestAdoptionDTO) {
    const animal = await this.animalRepo.findById(dto.animalId);

    if (!animal) {
      return new GenericErrors.NotFound(`Animal com id ${dto.animalId} não encontrado`);
    }

    if (!animal.isAvailable) {
      return new GenericErrors.InvalidParam(`Animal com id ${dto.animalId} não está disponível para adoção`);
    }

    const adoptionOrError = Adoption.create({
      animalId: animal.id,
      requestedBy: dto.user.id,
      associationId: animal.associationId,
      observation: dto.observation,
    });

    if (adoptionOrError instanceof GenericAppError) {
      return adoptionOrError;
    }

    return this.adoptionRepo.create(adoptionOrError);
  }
}
