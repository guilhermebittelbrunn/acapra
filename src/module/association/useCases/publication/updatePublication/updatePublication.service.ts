import {
  IPublicationRepository,
  IPublicationRepositorySymbol,
} from '@/repositories/publication.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdatePublicationDTO } from './dto/updatePublication.dto';
import { GenericException } from '@/shared/core/logic/GenericException';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import Publication from '@/module/association/domain/publication.domain';

@Injectable()
export class UpdatePublicationService {
  constructor(@Inject(IPublicationRepositorySymbol) private readonly publicationRepo: IPublicationRepository) {}

  async execute(dto: UpdatePublicationDTO): Promise<string> {
    const { publication } = await this.validateAndFetchFields(dto);

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
      throw new GenericException(publicationOrError.message, HttpStatus.BAD_REQUEST);
    }

    const rawId = await this.publicationRepo.update(publicationOrError);

    return rawId;
  }

  private async validateAndFetchFields(dto: UpdatePublicationDTO) {
    const publication = await this.publicationRepo.findById(dto.id);

    if (!publication) {
      throw new GenericException(`Espécie com id ${dto.id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return { publication };
  }
}
