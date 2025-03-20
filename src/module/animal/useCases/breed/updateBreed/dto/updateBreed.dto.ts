import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateBreedDTO } from '../../createBreed/dto/createBreed.dto';

import { ValidatedBoolean } from '@/shared/decorators/validatedTypes.decorator';

export class UpdateBreedDTO extends PartialType(CreateBreedDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedBoolean('status')
  enabled?: boolean;
}
