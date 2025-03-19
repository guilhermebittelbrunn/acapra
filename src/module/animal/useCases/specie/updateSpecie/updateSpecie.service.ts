import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateSpecieDTO } from './dto/updateSpecie.dto';
import { GenericException } from '@/shared/core/logic/GenericException';
import Specie from '@/module/animal/domain/specie.domain';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';
import GenericAppError from '@/shared/core/logic/GenericAppError';

@Injectable()
export class UpdateSpecieService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(dto: UpdateSpecieDTO): Promise<string> {
    const { specie } = await this.validateAndFetchFields(dto);

    const specieOrError = Specie.create(
      {
        name: coalesce(dto.name, specie.name),
        sequence: coalesce(dto.sequence, specie.sequence),
        associationId: specie.associationId,
        enabled: dto.enabled ?? specie.enabled,
      },
      specie.id,
    );

    if (specieOrError instanceof GenericAppError) {
      throw new GenericException(specieOrError.message, HttpStatus.BAD_REQUEST);
    }

    const rawId = await this.specieRepo.update(specieOrError);

    return rawId;
  }

  private async validateAndFetchFields(dto: UpdateSpecieDTO) {
    const specie = await this.specieRepo.findById(dto.id);

    if (!specie) {
      throw new GenericException(`Espécie com id ${dto.id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    if (dto?.name) {
      const specieWithSameName = await this.specieRepo.findByIdentifier({
        name: dto.name,
        associationId: specie.associationId.toValue(),
      });

      if (specieWithSameName) {
        throw new GenericException(`Espécie com nome ${dto.name} já existe`, HttpStatus.CONFLICT);
      }
    }

    return { specie };
  }
}
