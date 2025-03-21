import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import {
  ValidatedEnum,
  ValidatedMaxLength,
  ValidatedMinValue,
  ValidatedNumber,
  ValidatedString,
  ValidatedUUID,
} from '@/shared/decorators/validatedTypes.decorator';
import { AnimalGenderEnum } from '@/shared/types/animal';

export class CreateAnimalDTO {
  @ValidatedString('nome')
  @ValidatedMaxLength('nome', 255)
  name: string;

  @ValidatedUUID('espécie')
  specieId: string;

  @ValidatedString('raça')
  breed: string;

  @IsOptional()
  @ValidatedUUID('publicação')
  publicationId?: string;

  @ValidatedNumber('idade')
  @ValidatedMinValue('idade', 1)
  age: number;

  @ValidatedNumber('peso')
  @ValidatedMinValue('peso', 0, false)
  weight: number;

  @ValidatedEnum('genêro', AnimalGenderEnum)
  gender: AnimalGenderEnum;

  @IsOptional()
  @ValidatedString('descrição')
  description?: string;

  @ApiHideProperty()
  associationId: string;
}
