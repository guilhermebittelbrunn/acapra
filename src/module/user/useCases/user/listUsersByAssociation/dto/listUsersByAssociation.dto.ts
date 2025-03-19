import { PaginationQuery } from '@/repositories/base.repository.interface';
import { ApiHideProperty } from '@nestjs/swagger';

export class ListUsersByAssociationDTO extends PaginationQuery {
  @ApiHideProperty()
  associationId: string;
}
