import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateBreedDTO } from './dto/createBreed.dto';

import Breed from '@/module/animal/domain/breed.domain';
import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class CreateBreedService {
  constructor(@Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository) {}

  async execute(dto: CreateBreedDTO) {
    const breedWithSameName = await this.breedRepo.findByIdentifier({
      name: dto.name,
      associationId: dto.associationId,
      specieId: dto.specieId,
    });

    if (breedWithSameName) {
      throw new GenericException(`Raça com o nome ${dto.name} já cadastrada`, HttpStatus.CONFLICT);
    }

    const breedOrError = Breed.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
      specieId: new UniqueEntityID(dto.specieId),
    });

    if (breedOrError instanceof GenericAppError) {
      throw new GenericException(breedOrError);
    }

    const breed = await this.breedRepo.create(breedOrError);

    return breed;
  }
}
