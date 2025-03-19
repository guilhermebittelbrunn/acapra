import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateAssociationDTO } from './dto/updateAssociation.dto';
import { GenericException } from '@/shared/core/logic/GenericException';
import { Association } from '@/module/association/domain/association.domain';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';

@Injectable()
export class UpdateAssociationService {
  constructor(
    @Inject(IAssociationRepositorySymbol)
    private readonly associationRepo: IAssociationRepository,
  ) {}

  async execute(dto: UpdateAssociationDTO) {
    const association = await this.associationRepo.findById(dto.id);

    if (!association) {
      throw new GenericException(`Associação com id ${dto.id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    const associationOrError = Association.create(
      {
        name: coalesce(dto.name, association.name),
      },
      new UniqueEntityID(dto.id),
    );

    if (associationOrError instanceof GenericAppError) {
      throw new GenericException(associationOrError);
    }

    const rawId = await this.associationRepo.update(associationOrError);

    return rawId;
  }
}
