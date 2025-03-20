import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { SignUpDTO } from '../../../auth/signUp/dto/signUp.dto';

export class UpdateUserDTO extends PartialType(SignUpDTO) {
  @ApiHideProperty()
  id: string;
}
