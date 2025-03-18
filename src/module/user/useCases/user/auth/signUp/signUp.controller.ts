import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from '@/module/user/dto/user.dto';
import UserMapper from '@/module/user/mappers/user.mapper';
import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import { SignUpService } from './signUp.service';
import { SignUpDTO } from './dto/signUp.dto';

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
    return UserMapper.toDTO(result);
  }
}
