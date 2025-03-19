import { Inject, Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/createPublication.dto';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { GenericException } from '@/shared/core/logic/GenericException';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import Publication from '@/module/association/domain/publication.domain';

@Injectable()
export class CreatePublicationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(dto: CreatePublicationDTO) {
    const publicationOrError = Publication.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
    });

    if (publicationOrError instanceof GenericAppError) {
      throw new GenericException(publicationOrError);
    }

    const publication = await this.publicationRepo.create(publicationOrError);

    return publication;
  }
}
