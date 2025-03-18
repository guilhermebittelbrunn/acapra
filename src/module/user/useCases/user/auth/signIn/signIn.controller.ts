import { Controller, Post } from '@nestjs/common';
import { SignInService } from './signIn.service';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { SignInDTO } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';
import UserMapper from '@/module/user/mappers/user.mapper';

@Controller('signin')
@ApiTags('auth')
export class SignInController {
  constructor(private readonly useCase: SignInService) {}

  @Post()
  async handle(@ValidatedBody() body: SignInDTO) {
    const { user, tokens } = await this.useCase.execute(body);

    console.log({ user: UserMapper.toDTO(user), tokens });

    return {
      user: UserMapper.toDTO(user),
      tokens,
    };
  }
}
