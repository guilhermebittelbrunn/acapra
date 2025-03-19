import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateBreedDTO } from './dto/updateBreed.dto';
import { GenericException } from '@/shared/core/logic/GenericException';
import Breed from '@/module/animal/domain/breed.domain';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';
import GenericAppError from '@/shared/core/logic/GenericAppError';

@Injectable()
export class UpdateBreedService {
  constructor(@Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository) {}

  async execute(dto: UpdateBreedDTO): Promise<string> {
    const { breed } = await this.validateAndFetchFields(dto);

    const breedOrError = Breed.create(
      {
        name: coalesce(dto.name, breed.name),
        sequence: coalesce(dto.sequence, breed.sequence),
        associationId: breed.associationId,
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

    return { breed };
  }
}
