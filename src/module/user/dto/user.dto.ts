import { ApiUUIDProperty } from '@/infra/openAPI/swagger/decorators/apiUUIDProperty.decorator';
import { UserTypeEnum } from '@/shared/types/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiUUIDProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email?: string | null;

  @ApiProperty()
  type: UserTypeEnum;
}
