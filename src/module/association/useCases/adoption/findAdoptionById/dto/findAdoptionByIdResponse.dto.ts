import { ApiProperty } from '@nestjs/swagger';

import AnimalDTO from '@/module/animal/dto/animal.dto';
import { AdoptionDTO } from '@/module/association/dto/adoption.dto';
import { UserDTO } from '@/module/user/dto/user.dto';

export class FindAdoptionByIdResponseDTO extends AdoptionDTO {
  @ApiProperty()
  requestedByUser?: UserDTO;

  @ApiProperty()
  animal?: AnimalDTO;
}
