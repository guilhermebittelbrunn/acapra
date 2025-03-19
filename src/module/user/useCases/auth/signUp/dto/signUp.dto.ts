import { ValidatedEmail, ValidatedString } from '@/shared/decorators/validatedTypes.decorator';
import { UserTypeEnum } from '@/shared/types/user';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDTO {
  @ValidatedEmail()
  email: string;

  @ValidatedString('senha')
  password: string;

  @ValidatedString('nome')
  name: string;

  @ApiHideProperty()
  type?: UserTypeEnum;

  @ApiHideProperty()
  associationId?: string;
}
