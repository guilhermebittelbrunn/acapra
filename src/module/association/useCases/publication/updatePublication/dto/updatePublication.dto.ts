import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreatePublicationDTO } from '../../createPublication/dto/createPublication.dto';

import { ValidatedBoolean } from '@/shared/decorators/validatedTypes.decorator';

export class UpdatePublicationDTO extends PartialType(CreatePublicationDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedBoolean('status')
  enabled?: boolean;
}
