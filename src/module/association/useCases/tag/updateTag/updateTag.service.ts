import { Inject, Injectable } from '@nestjs/common';

import { UpdateTagDTO } from './dto/updateTag.dto';

import Tag from '@/module/association/domain/tag.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateTagService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(dto: UpdateTagDTO) {
    const validatedFieldsOrError = await this.validateAndFetchFields(dto);
    if (validatedFieldsOrError instanceof GenericAppError) {
      return validatedFieldsOrError;
    }

    const { tag } = validatedFieldsOrError;
    const tagOrError = Tag.create(
      {
        name: coalesce(dto.name, tag.name),
        associationId: tag.associationId,
        enabled: dto.enabled ?? tag.enabled,
      },
      tag.id,
    );

    if (tagOrError instanceof GenericAppError) {
      return tagOrError;
    }

    return this.tagRepo.update(tagOrError);
  }

  private async validateAndFetchFields(dto: UpdateTagDTO) {
    const tag = await this.tagRepo.findById(dto.id);

    if (!tag) {
      return new GenericErrors.NotFound(`Etiqueta com id ${dto.id} não encontrada`);
    }

    if (dto?.name) {
      const tagWithSameName = await this.tagRepo.findByIdentifier({
        name: dto.name,
        associationId: tag.associationId.toValue(),
      });

      if (tagWithSameName) {
        return new GenericErrors.Conflict(`Etiqueta com nome ${dto.name} já existe`);
      }
    }

    return { tag };
  }
}
