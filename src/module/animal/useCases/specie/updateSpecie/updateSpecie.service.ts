import { Inject, Injectable } from '@nestjs/common';

import { UpdateSpecieDTO } from './dto/updateSpecie.dto';

import Specie from '@/module/animal/domain/specie.domain';
import SpecieBase from '@/module/animal/domain/specieBase.domain';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import {
  ISpecieBaseRepository,
  ISpecieBaseRepositorySymbol,
} from '@/repositories/specieBase.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateSpecieService {
  constructor(
    @Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository,
    @Inject(ISpecieBaseRepositorySymbol) private readonly specieBaseRepo: ISpecieBaseRepository,
  ) {}

  async execute(dto: UpdateSpecieDTO) {
    const validatedFieldsOrError = await this.validateAndFetchFields(dto);
    if (validatedFieldsOrError instanceof GenericAppError) {
      return validatedFieldsOrError;
    }

    const { specie, specieBase } = validatedFieldsOrError;
    const specieOrError = Specie.create(
      {
        name: coalesce(dto.name, specie.name),
        sequence: coalesce(dto.sequence, specie.sequence),
        associationId: specie.associationId,
        specieBaseId: coalesce(specieBase?.id, specie.specieBaseId),
        enabled: dto.enabled ?? specie.enabled,
      },
      specie.id,
    );

    if (specieOrError instanceof GenericAppError) {
      return new GenericErrors.NotFound(specieOrError.message);
    }

    return this.specieRepo.update(specieOrError);
  }

  private async validateAndFetchFields(dto: UpdateSpecieDTO) {
    const specie = await this.specieRepo.findById(dto.id);
    let specieBaseEntity: SpecieBase | undefined;

    if (!specie) {
      return new GenericErrors.NotFound(`Espécie com id ${dto.id} não encontrada`);
    }

    if (dto?.name) {
      const specieWithSameName = await this.specieRepo.findByIdentifier({
        name: dto.name,
        associationId: specie.associationId.toValue(),
      });

      if (specieWithSameName) {
        return new GenericErrors.NotFound(`Espécie com nome ${dto.name} já existe`);
      }
    }

    if (dto?.specieBaseId) {
      const specieBase = await this.specieBaseRepo.findById(dto.specieBaseId);

      if (!specieBase) {
        return new GenericErrors.NotFound(`Base de espécie com id ${dto.specieBaseId} não encontrada`);
      }
      specieBaseEntity = specieBase;
    }

    return { specie, specieBase: specieBaseEntity };
  }
}
