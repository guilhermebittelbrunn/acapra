import { ApiHideProperty } from '@nestjs/swagger';

import { PaginationQuery } from '@/repositories/base.repository.interface';

export class ListTagsByAssociationDTO extends PaginationQuery {
  @ApiHideProperty()
  associationId: string;
}
