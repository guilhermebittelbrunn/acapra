import { Inject, Injectable } from '@nestjs/common';

import { UpdateAssociationDTO } from './dto/updateAssociation.dto';

import { Association } from '@/module/association/domain/association.domain';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateAssociationService {
  constructor(
    @Inject(IAssociationRepositorySymbol)
    private readonly associationRepo: IAssociationRepository,
  ) {}

  async execute(dto: UpdateAssociationDTO) {
    const association = await this.associationRepo.findById(dto.id);

    if (!association) {
      return new GenericErrors.NotFound(`Associação com id ${dto.id} não encontrada`);
    }

    const associationWithSameCredentials = await this.associationRepo.findByIdentifier({ name: dto.name });

    if (associationWithSameCredentials && !associationWithSameCredentials.id.equalsRaw(dto.id)) {
      return new GenericErrors.Conflict(`Já existe uma associação com esse nome: ${dto.name}`);
    }

    const associationOrError = Association.create(
      {
        name: coalesce(dto.name, association.name),
      },
      new UniqueEntityID(dto.id),
    );

    if (associationOrError instanceof GenericAppError) {
      return associationOrError;
    }

    return this.associationRepo.update(associationOrError);
  }
}
