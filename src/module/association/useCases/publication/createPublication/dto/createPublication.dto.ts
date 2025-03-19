import {
  ValidatedMaxLength,
  ValidatedNumber,
  ValidatedString,
} from '@/shared/decorators/validatedTypes.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

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
