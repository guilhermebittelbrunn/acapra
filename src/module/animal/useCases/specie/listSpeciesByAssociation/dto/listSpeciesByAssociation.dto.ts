import { PaginationQuery } from '@/repositories/base.repository.interface';
import { ApiHideProperty } from '@nestjs/swagger';

export class ListSpecieByAssociationDTO extends PaginationQuery {
  @ApiHideProperty()
  associationId: string;
}
