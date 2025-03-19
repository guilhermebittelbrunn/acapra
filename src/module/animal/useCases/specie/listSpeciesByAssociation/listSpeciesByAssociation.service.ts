import { ISpecieRepository, ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ListSpecieByAssociationDTO } from './dto/listSpeciesByAssociation.dto';

@Injectable()
export class ListSpeciesByAssociationService {
  constructor(@Inject(ISpecieRepositorySymbol) private readonly specieRepo: ISpecieRepository) {}

  async execute(dto: ListSpecieByAssociationDTO) {
    return this.specieRepo.listByAssociationId(dto);
  }
}
