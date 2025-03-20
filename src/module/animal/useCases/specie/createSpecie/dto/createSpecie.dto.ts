import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import {
  ValidatedMaxLength,
  ValidatedNumber,
  ValidatedString,
  ValidatedUUID,
} from '@/shared/decorators/validatedTypes.decorator';

export class CreateSpecieDTO {
  @ValidatedString('nome')
  @ValidatedMaxLength('nome', 255)
  name: string;

  @IsOptional()
  @ValidatedNumber('sequência')
  sequence?: number;

  @ValidatedUUID('espécie base')
  specieBaseId: string;

  @ApiHideProperty()
  associationId: string;
}
