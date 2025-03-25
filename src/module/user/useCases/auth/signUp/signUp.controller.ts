import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignUpDTO } from './dto/signUp.dto';
import { SignUpService } from './signUp.service';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import { UserDTO } from '@/module/user/dto/user.dto';
import UserMapper from '@/module/user/mappers/user.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';

@Controller('/signup')
@ApiTags('auth')
export class SignUpController {
  constructor(
    private readonly useCase: SignUpService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Post()
  async handle(@ValidatedBody() body: SignUpDTO): Promise<UserDTO> {
    const result = await this.transactionManager.run(() => this.useCase.execute(body));

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return UserMapper.toDTO(result);
  }
}
