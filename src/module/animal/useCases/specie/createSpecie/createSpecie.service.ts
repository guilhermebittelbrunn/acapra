import { Inject, Injectable } from '@nestjs/common';

import { CreateSpecieDTO } from './dto/createSpecie.dto';

import Specie from '@/module/animal/domain/specie.domain';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class CreateSpecieService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(dto: CreateSpecieDTO) {
    const specieWithSameName = await this.specieRepo.findByIdentifier({
      name: dto.name,
      associationId: dto.associationId,
      specieBaseId: dto.specieBaseId,
    });

    if (specieWithSameName) {
      return new GenericErrors.Conflict(`Espécie com o nome ${dto.name} já cadastrada`);
    }

    const specieOrError = Specie.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
      specieBaseId: new UniqueEntityID(dto.specieBaseId),
    });

    if (specieOrError instanceof GenericAppError) {
      return specieOrError;
    }

    return this.specieRepo.create(specieOrError);
  }
}
