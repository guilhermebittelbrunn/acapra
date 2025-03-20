import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PaginationQuery } from '@/repositories/base.repository.interface';
import { ValidatedIds } from '@/shared/decorators/validatedIds.decorator';

export class ListBreedsByAssociationDTO extends PaginationQuery {
  @IsOptional()
  @ValidatedIds()
  specieIds: string[];

  @ApiHideProperty()
  associationId: string;
}
