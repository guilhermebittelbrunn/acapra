import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import {
  ValidatedMaxLength,
  ValidatedNumber,
  ValidatedString,
} from '@/shared/decorators/validatedTypes.decorator';

export class CreateSpecieDTO {
  @ValidatedString('nome')
  @ValidatedMaxLength('nome', 255)
  name: string;

  @IsOptional()
  @ValidatedNumber('sequência')
  sequence?: number;

  @ApiHideProperty()
  associationId: string;
}
