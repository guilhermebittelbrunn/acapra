import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateSpecieDTO } from '../../createSpecie/dto/createSpecie.dto';

import { ValidatedBoolean } from '@/shared/decorators/validatedTypes.decorator';

export class UpdateSpecieDTO extends PartialType(CreateSpecieDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedBoolean('status')
  enabled?: boolean;
}
