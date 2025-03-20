import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { GenericException } from '@/shared/core/logic/GenericException';
import { UserTypeEnum } from '@/shared/types/user';

@Injectable()
export class SignUpService {
  constructor(
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
    @Inject(IAssociationRepositorySymbol) private readonly associationRepo: IAssociationRepository,
  ) {}

  async execute(dto: SignUpDTO) {
    const { associationId } = await this.validateAndFetchFields(dto);

    const { userType, userPassword, userEmail } = this.buildEntities(dto);

    const userOrError = User.create({
      ...dto,
      associationId,
      email: userEmail,
      password: userPassword,
      type: userType,
    });

    if (userOrError instanceof GenericAppError) {
      throw new GenericException(userOrError);
    }

    return this.userRepo.create(userOrError);
  }

  private async validateAndFetchFields(dto: SignUpDTO) {
    let associationId: UniqueEntityID | undefined = undefined;

    const userWithSameCredentials = await this.userRepo.findByEmail(dto.email);

    if (userWithSameCredentials) {
      throw new GenericException(`E-mail já em uso: ${dto.email}`, HttpStatus.CONFLICT);
    }

    if (!isEmpty(dto.associationId)) {
      const association = await this.associationRepo.findById(dto.associationId);

      if (!association) {
        throw new GenericException('Associação não encontrada', HttpStatus.NOT_FOUND);
      }

      associationId = association.id;
    }

    return { associationId };
  }

  private buildEntities(dto: SignUpDTO) {
    const userType = UserType.create(dto.type || UserTypeEnum.USER);

    if (userType instanceof GenericAppError) {
      throw new GenericException(userType);
    }

    const userPassword = UserPassword.create({ value: dto.password, hashed: false });

    if (userPassword instanceof GenericAppError) {
      throw new GenericException(userPassword);
    }

    const userEmail = UserEmail.create(dto.email);

    if (userEmail instanceof GenericAppError) {
      throw new GenericException(userEmail);
    }

    return { userType, userPassword, userEmail };
  }
}
