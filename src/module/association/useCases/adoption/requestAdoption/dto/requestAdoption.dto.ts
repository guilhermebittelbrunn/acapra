import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import User from '@/module/user/domain/user/user.domain';
import { ValidatedString, ValidatedUUID } from '@/shared/decorators/validatedTypes.decorator';

export class RequestAdoptionDTO {
  @ValidatedUUID('animal')
  animalId: string;

  @IsOptional()
  @ValidatedString('observação')
  observation?: string;

  @ApiHideProperty()
  user: User;
}
