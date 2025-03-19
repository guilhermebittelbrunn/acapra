import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreatePublicationDTO } from '../../createPublication/dto/createPublication.dto';
import { ValidatedBoolean } from '@/shared/decorators/validatedTypes.decorator';
import { IsOptional } from 'class-validator';

export class UpdatePublicationDTO extends PartialType(CreatePublicationDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedBoolean('status')
  enabled?: boolean;
}
