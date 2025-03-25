import { Inject, Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';

import { SignUpDTO } from './dto/signUp.dto';

import User from '@/module/user/domain/user/user.domain';
import UserEmail from '@/module/user/domain/user/userEmail.domain';
import UserPassword from '@/module/user/domain/user/userPassword.domain';
import UserType from '@/module/user/domain/user/userType.domain';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { UserTypeEnum } from '@/shared/types/user';

@Injectable()
export class SignUpService {
  constructor(
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
    @Inject(IAssociationRepositorySymbol) private readonly associationRepo: IAssociationRepository,
  ) {}

  async execute(dto: SignUpDTO) {
    const validatedField = await this.validateAndFetchFields(dto);
    if (validatedField instanceof GenericAppError) {
      return validatedField;
    }

    const entities = this.buildEntities(dto);
    if (entities instanceof GenericAppError) {
      return entities;
    }

    const { userType, userPassword, userEmail } = entities;

    const userOrError = User.create({
      ...dto,
      associationId: validatedField.associationId,
      email: userEmail,
      password: userPassword,
      type: userType,
    });

    if (userOrError instanceof GenericAppError) {
      return userOrError;
    }

    return this.userRepo.create(userOrError);
  }

  private async validateAndFetchFields(dto: SignUpDTO) {
    let associationId: UniqueEntityID | undefined = undefined;

    const userWithSameCredentials = await this.userRepo.findByEmail(dto.email);

    if (userWithSameCredentials) {
      return new GenericErrors.Conflict(`E-mail já em uso: ${dto.email}`);
    }

    if (!isEmpty(dto.associationId)) {
      const association = await this.associationRepo.findById(dto.associationId);

      if (!association) {
        return new GenericErrors.Conflict('Associação não encontrada');
      }

      associationId = association.id;
    }

    return { associationId };
  }

  private buildEntities(dto: SignUpDTO) {
    const userType = UserType.create(dto.type || UserTypeEnum.USER);

    if (userType instanceof GenericAppError) {
      return userType;
    }

    const userPassword = UserPassword.create({ value: dto.password, hashed: false });

    if (userPassword instanceof GenericAppError) {
      return userPassword;
    }

    const userEmail = UserEmail.create(dto.email);

    if (userEmail instanceof GenericAppError) {
      return userEmail;
    }

    return { userType, userPassword, userEmail };
  }
}
