import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSpecieDTO } from './dto/createSpecie.dto';
import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import Specie from '@/module/animal/domain/specie.domain';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';

@Injectable()
export class CreateSpecieService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(dto: CreateSpecieDTO) {
    const specieWithSameName = await this.specieRepo.findByIdentifier({
      name: dto.name,
      associationId: dto.associationId,
    });

    if (specieWithSameName) {
      throw new GenericException(`Espécie com o nome ${dto.name} já cadastrada`, HttpStatus.CONFLICT);
    }

    const specieOrError = Specie.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
    });

    if (specieOrError instanceof GenericAppError) {
      throw new GenericException(specieOrError);
    }

    const specie = await this.specieRepo.create(specieOrError);

    return specie;
  }
}
