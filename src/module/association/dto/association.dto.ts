import { ApiUUIDProperty } from '@/infra/openAPI/swagger/decorators/apiUUIDProperty.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class AssociationDTO {
  @ApiUUIDProperty()
  id: string;

  @ApiProperty()
  name: string;
}
