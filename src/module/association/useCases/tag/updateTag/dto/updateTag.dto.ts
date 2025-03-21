import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateTagDTO } from '../../createTag/dto/createTag.dto';

import { ValidatedBoolean } from '@/shared/decorators/validatedTypes.decorator';

export class UpdateTagDTO extends PartialType(CreateTagDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedBoolean('status')
  enabled?: boolean;
}
