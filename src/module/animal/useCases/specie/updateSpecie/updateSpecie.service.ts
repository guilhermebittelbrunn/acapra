import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UpdateSpecieDTO } from './dto/updateSpecie.dto';

import Specie from '@/module/animal/domain/specie.domain';
import SpecieBase from '@/module/animal/domain/specieBase.domain';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import {
  ISpecieBaseRepository,
  ISpecieBaseRepositorySymbol,
} from '@/repositories/specieBase.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateSpecieService {
  constructor(
    @Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository,
    @Inject(ISpecieBaseRepositorySymbol) private readonly specieBaseRepo: ISpecieBaseRepository,
  ) {}

  async execute(dto: UpdateSpecieDTO): Promise<string> {
    const { specie, specieBase } = await this.validateAndFetchFields(dto);

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
      throw new GenericException(specieOrError.message, HttpStatus.BAD_REQUEST);
    }

    const rawId = await this.specieRepo.update(specieOrError);

    return rawId;
  }

  private async validateAndFetchFields(dto: UpdateSpecieDTO) {
    let specieBaseEntity: SpecieBase | undefined;
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

    if (dto?.specieBaseId) {
      const specieBase = await this.specieBaseRepo.findById(dto.specieBaseId);

      if (!specieBase) {
        throw new GenericException(
          `Base de espécie com id ${dto.specieBaseId} não encontrada`,
          HttpStatus.NOT_FOUND,
        );
      }
      specieBaseEntity = specieBase;
    }

    return { specie, specieBase: specieBaseEntity };
  }
}
