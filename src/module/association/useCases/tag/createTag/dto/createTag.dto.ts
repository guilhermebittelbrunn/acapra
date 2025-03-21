import { ApiHideProperty } from '@nestjs/swagger';

import { ValidatedMaxLength, ValidatedString } from '@/shared/decorators/validatedTypes.decorator';

export class CreateTagDTO {
  @ValidatedString('nome')
  @ValidatedMaxLength('nome', 255)
  name: string;

  @ApiHideProperty()
  associationId: string;
}
