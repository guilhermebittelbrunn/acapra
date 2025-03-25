import { Inject, Injectable } from '@nestjs/common';

import { UpdatePublicationDTO } from './dto/updatePublication.dto';

import Publication from '@/module/association/domain/publication.domain';
import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdatePublicationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(dto: UpdatePublicationDTO) {
    const validatedFieldsOrError = await this.validateAndFetchFields(dto);

    if (validatedFieldsOrError instanceof GenericAppError) {
      return validatedFieldsOrError;
    }

    const { publication } = validatedFieldsOrError;
    const publicationOrError = Publication.create(
      {
        title: coalesce(dto.title, publication.title),
        content: coalesce(dto.content, publication.content),
        associationId: publication.associationId,
        enabled: dto.enabled ?? publication.enabled,
      },
      publication.id,
    );

    if (publicationOrError instanceof GenericAppError) {
      return publicationOrError;
    }

    return this.publicationRepo.update(publicationOrError);
  }

  private async validateAndFetchFields(dto: UpdatePublicationDTO) {
    const publication = await this.publicationRepo.findById(dto.id);

    if (!publication) {
      return new GenericErrors.NotFound(`Espécie com id ${dto.id} não encontrada`);
    }

    return { publication };
  }
}
