import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PaginationQuery } from '@/repositories/base.repository.interface';
import { ValidatedEnum } from '@/shared/decorators/validatedTypes.decorator';
import { AdoptionStatusEnum } from '@/shared/types/association';

export class ListAdoptionForUserDTO extends PaginationQuery {
  @IsOptional()
  @ValidatedEnum('status', AdoptionStatusEnum, { each: true })
  statuses?: AdoptionStatusEnum[];

  @ApiHideProperty()
  userId: string;
}
