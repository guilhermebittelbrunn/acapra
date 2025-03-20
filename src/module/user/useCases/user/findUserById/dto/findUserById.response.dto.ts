import { ApiProperty } from '@nestjs/swagger';

import { AssociationDTO } from '@/module/association/dto/association.dto';
import { UserDTO } from '@/module/user/dto/user.dto';

export class FindUserByIdResponseDTO extends UserDTO {
  @ApiProperty({ type: AssociationDTO })
  association?: AssociationDTO;
}
