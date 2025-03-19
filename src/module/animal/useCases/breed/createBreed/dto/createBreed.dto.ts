import {
  ValidatedMaxLength,
  ValidatedNumber,
  ValidatedString,
  ValidatedUUID,
} from '@/shared/decorators/validatedTypes.decorator';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateBreedDTO {
  @ValidatedString('nome')
  @ValidatedMaxLength('nome', 255)
  name: string;

  @IsOptional()
  @ValidatedNumber('sequência')
  sequence?: number;

  @ValidatedUUID('espécie')
  specieId: string;

  @ApiHideProperty()
  associationId: string;
}
