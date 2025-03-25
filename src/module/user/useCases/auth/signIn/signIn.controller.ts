import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignInDTO } from './dto/signIn.dto';
import { SignInService } from './signIn.service';

import UserMapper from '@/module/user/mappers/user.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';

@Controller('signin')
@ApiTags('auth')
export class SignInController {
  constructor(private readonly useCase: SignInService) {}

  @Post()
  async handle(@ValidatedBody() body: SignInDTO) {
    const result = await this.useCase.execute(body);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return {
      user: UserMapper.toDTO(result.user),
      tokens: result.tokens,
    };
  }
}
