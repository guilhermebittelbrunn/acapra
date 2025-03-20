import { ApiHideProperty } from '@nestjs/swagger';

import { ValidatedMaxLength, ValidatedString } from '@/shared/decorators/validatedTypes.decorator';

export class CreatePublicationDTO {
  @ValidatedString('título')
  @ValidatedMaxLength('título', 255)
  title: string;

  @ValidatedString('conteúdo')
  @ValidatedMaxLength('conteúdo', 255)
  content: string;

  @ApiHideProperty()
  associationId: string;
}
