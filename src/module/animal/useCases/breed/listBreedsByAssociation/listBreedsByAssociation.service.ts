import { IBreedRepository, IBreedRepositorySymbol } from '@/repositories/breed.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ListBreedsByAssociationDTO } from './dto/listBreedsByAssociation.dto';

@Injectable()
export class ListBreedsByAssociationService {
  constructor(@Inject(IBreedRepositorySymbol) private readonly breedRepo: IBreedRepository) {}

  async execute(dto: ListBreedsByAssociationDTO) {
    return this.breedRepo.listByAssociationId(dto);
  }
}
