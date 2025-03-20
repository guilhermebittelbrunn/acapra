import { ApiHideProperty } from '@nestjs/swagger';

import { ValidatedEmail, ValidatedString } from '@/shared/decorators/validatedTypes.decorator';
import { UserTypeEnum } from '@/shared/types/user';

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
