import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateAssociationDTO } from './dto/createAssociation.dto';

import { Association } from '@/module/association/domain/association.domain';
import { SignUpService } from '@/module/user/useCases/auth/signUp/signUp.service';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { UserTypeEnum } from '@/shared/types/user';

@Injectable()
export class CreateAssociationService {
  constructor(
    @Inject(IAssociationRepositorySymbol)
    private readonly associationRepo: IAssociationRepository,
    private readonly createUser: SignUpService,
  ) {}

  async execute(dto: CreateAssociationDTO) {
    const associationWithSameCredentials = await this.associationRepo.findByIdentifier({ name: dto.name });

    if (associationWithSameCredentials) {
      throw new GenericException(`Já existe uma associação com esse nome: ${dto.name}`, HttpStatus.CONFLICT);
    }

    const associationOrError = Association.create({ ...dto });

    if (associationOrError instanceof GenericAppError) {
      throw new GenericException(associationOrError);
    }

    const association = await this.associationRepo.create(associationOrError);

    await this.createUser.execute({
      ...dto,
      email: dto.email,
      password: dto.password,
      type: UserTypeEnum.PARTNER,
      associationId: associationOrError.id.toValue(),
    });

    return association;
  }
}
