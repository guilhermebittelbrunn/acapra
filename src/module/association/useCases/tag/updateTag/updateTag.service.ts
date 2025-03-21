import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UpdateTagDTO } from './dto/updateTag.dto';

import Tag from '@/module/association/domain/tag.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateTagService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(dto: UpdateTagDTO): Promise<string> {
    const { tag } = await this.validateAndFetchFields(dto);

    const tagOrError = Tag.create(
      {
        name: coalesce(dto.name, tag.name),
        associationId: tag.associationId,
        enabled: dto.enabled ?? tag.enabled,
      },
      tag.id,
    );

    if (tagOrError instanceof GenericAppError) {
      throw new GenericException(tagOrError.message, HttpStatus.BAD_REQUEST);
    }

    const rawId = await this.tagRepo.update(tagOrError);

    return rawId;
  }

  private async validateAndFetchFields(dto: UpdateTagDTO) {
    const tag = await this.tagRepo.findById(dto.id);

    if (!tag) {
      throw new GenericException(`Etiqueta com id ${dto.id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    if (dto?.name) {
      const tagWithSameName = await this.tagRepo.findByIdentifier({
        name: dto.name,
        associationId: tag.associationId.toValue(),
      });

      if (tagWithSameName) {
        throw new GenericException(`Etiqueta com nome ${dto.name} já existe`, HttpStatus.CONFLICT);
      }
    }

    return { tag };
  }
}
