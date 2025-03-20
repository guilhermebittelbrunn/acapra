import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UpdateBreedDTO } from './dto/updateBreed.dto';

import Breed from '@/module/animal/domain/breed.domain';
import Specie from '@/module/animal/domain/specie.domain';
import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateBreedService {
  constructor(@Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository) {}

  async execute(dto: UpdateBreedDTO): Promise<string> {
    const { breed, specie } = await this.validateAndFetchFields(dto);

    const breedOrError = Breed.create(
      {
        name: coalesce(dto.name, breed.name),
        sequence: coalesce(dto.sequence, breed.sequence),
        associationId: breed.associationId,
        specieId: specie.id ?? breed.specieId,
        enabled: dto.enabled ?? breed.enabled,
      },
      breed.id,
    );

    if (breedOrError instanceof GenericAppError) {
      throw new GenericException(breedOrError.message, HttpStatus.BAD_REQUEST);
    }

    const rawId = await this.breedRepo.update(breedOrError);

    return rawId;
  }

  private async validateAndFetchFields(dto: UpdateBreedDTO) {
    let specieEntity: Specie | undefined;
    const breed = await this.breedRepo.findById(dto.id);

    if (!breed) {
      throw new GenericException(`Raça com id ${dto.id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    if (dto?.name) {
      const breedWithSameName = await this.breedRepo.findByIdentifier({
        name: dto.name,
        associationId: breed.associationId.toValue(),
        specieId: breed.specieId.toValue(),
      });

      if (breedWithSameName) {
        throw new GenericException(`Raça com nome ${dto.name} já existe`, HttpStatus.CONFLICT);
      }
    }

    if (dto.specieId) {
      const specie = await this.breedRepo.findById(dto.specieId);

      if (!specie) {
        throw new GenericException(`Espécie com id ${dto.specieId} não encontrada`, HttpStatus.NOT_FOUND);
      }

      specieEntity = specie;
    }

    return { breed, specie: specieEntity };
  }
}
