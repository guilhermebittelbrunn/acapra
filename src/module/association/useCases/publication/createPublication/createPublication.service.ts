import { Inject, Injectable } from '@nestjs/common';

import { CreatePublicationDTO } from './dto/createPublication.dto';

import Publication from '@/module/association/domain/publication.domain';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';

@Injectable()
export class CreatePublicationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(dto: CreatePublicationDTO) {
    const publicationOrError = Publication.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
    });

    if (publicationOrError instanceof GenericAppError) {
      return publicationOrError;
    }

    return this.publicationRepo.create(publicationOrError);
  }
}
