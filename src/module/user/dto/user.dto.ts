import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { ApiUUIDProperty } from '@/infra/openAPI/swagger/decorators/apiUUIDProperty.decorator';
import { AssociationDTO } from '@/module/association/dto/association.dto';
import { UserTypeEnum } from '@/shared/types/user';

export class UserDTO {
  @ApiUUIDProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  associationId?: string | null;

  @ApiProperty()
  addressId: string | null;

  @ApiProperty()
  email?: string | null;

  @ApiProperty()
  type: UserTypeEnum;

  @ApiHideProperty()
  association?: AssociationDTO;
}
