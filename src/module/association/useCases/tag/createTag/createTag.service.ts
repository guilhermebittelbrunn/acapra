import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateTagDTO } from './dto/createTag.dto';

import Tag from '@/module/association/domain/tag.domain';
import { ITagRepository, ITagRepositorySymbol } from '@/repositories/tag.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';

@Injectable()
export class CreateTagService {
  constructor(@Inject(ITagRepositorySymbol) private readonly tagRepo: ITagRepository) {}

  async execute(dto: CreateTagDTO) {
    const tagWithSameName = await this.tagRepo.findByIdentifier({
      name: dto.name,
      associationId: dto.associationId,
    });

    if (tagWithSameName) {
      throw new GenericException(`Etiqueta com o nome ${dto.name} já cadastrada`, HttpStatus.CONFLICT);
    }

    const tagOrError = Tag.create({
      ...dto,
      associationId: new UniqueEntityID(dto.associationId),
    });

    if (tagOrError instanceof GenericAppError) {
      throw new GenericException(tagOrError);
    }

    const tag = await this.tagRepo.create(tagOrError);

    return tag;
  }
}
