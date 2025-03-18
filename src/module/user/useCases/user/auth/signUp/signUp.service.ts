import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { SignUpDTO } from './dto/signUp.dto';
import User from '@/module/user/domain/user/user.domain';
import UserType from '@/module/user/domain/user/userType.domain';
import { UserTypeEnum } from '@/shared/types/user';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import UserPassword from '@/module/user/domain/user/userPassword.domain';
import UserEmail from '@/module/user/domain/user/userEmail.domain';

@Injectable()
export class SignUpService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(dto: SignUpDTO) {
    await this.validateFields(dto);

    const { userType, userPassword, userEmail } = this.buildEntities(dto);

    console.log('userPassword :>> ', userPassword);

    const user = User.create({
      ...dto,
      email: userEmail,
      password: userPassword,
      type: userType,
    });

    return this.userRepo.create(user);
  }

  private async validateFields(dto: SignUpDTO) {
    const userWithSameCredentials = await this.userRepo.findByEmail(dto.email);

    if (userWithSameCredentials) {
      throw new HttpException('e-mail já cadastrado no sistema', HttpStatus.CONFLICT);
    }
  }

  private buildEntities(dto: SignUpDTO) {
    const userType = UserType.create(UserTypeEnum.USER);

    if (userType instanceof GenericAppError) {
      throw new HttpException(userType.message, GenericErrors.getStatusCode(userType));
    }

    const userPassword = UserPassword.create({ value: dto.password, hashed: false });

    if (userPassword instanceof GenericAppError) {
      throw new HttpException(userPassword.message, GenericErrors.getStatusCode(userPassword));
    }

    const userEmail = UserEmail.create(dto.email);

    if (userEmail instanceof GenericAppError) {
      throw new HttpException(userEmail.message, GenericErrors.getStatusCode(userEmail));
    }

    return { userType, userPassword, userEmail };
  }
}
