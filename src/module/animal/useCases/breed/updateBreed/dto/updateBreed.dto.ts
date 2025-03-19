import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateBreedDTO } from '../../createBreed/dto/createBreed.dto';
import { ValidatedBoolean } from '@/shared/decorators/validatedTypes.decorator';
import { IsOptional } from 'class-validator';

export class UpdateBreedDTO extends PartialType(CreateBreedDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedBoolean('status')
  enabled?: boolean;
}
