import { Inject, Injectable } from '@nestjs/common';

import { CreateTagDTO } from './dto/createTag.dto';

import Tag from '@/module/association/domain/tag/tag.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class CreateTagService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(dto: CreateTagDTO) {
    const tagWithSameName = await this.tagRepo.findByIdentifier({
      name: dto.name,
      associationId: dto.associationId,
    });

    if (tagWithSameName) {
      return new GenericErrors.Conflict(`Etiqueta com o nome ${dto.name} já cadastrada`);
    }

    const tagOrError = Tag.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
    });

    if (tagOrError instanceof GenericAppError) {
      return tagOrError;
    }

    return this.tagRepo.create(tagOrError);
  }
}
