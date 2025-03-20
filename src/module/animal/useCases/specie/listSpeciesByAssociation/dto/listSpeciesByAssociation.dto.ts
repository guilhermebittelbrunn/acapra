import { ApiHideProperty } from '@nestjs/swagger';

import { PaginationQuery } from '@/repositories/base.repository.interface';

export class ListSpecieByAssociationDTO extends PaginationQuery {
  @ApiHideProperty()
  associationId: string;
}
