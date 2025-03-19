import { AssociationDTO } from '@/module/association/dto/association.dto';
import { UserDTO } from '@/module/user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserByIdResponseDTO extends UserDTO {
  @ApiProperty({ type: AssociationDTO })
  association?: AssociationDTO;
}
