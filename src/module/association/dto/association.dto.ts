import { ApiProperty } from '@nestjs/swagger';

import { ApiUUIDProperty } from '@/infra/openAPI/swagger/decorators/apiUUIDProperty.decorator';

export class AssociationDTO {
  @ApiUUIDProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiUUIDProperty()
  addressId?: string | null;
}
