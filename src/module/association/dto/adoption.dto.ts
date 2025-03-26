import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import AnimalDTO from '@/module/animal/dto/animal.dto';
import { UserDTO } from '@/module/user/dto/user.dto';

export class AdoptionDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  requestedBy: string;

  @ApiProperty()
  respondedBy?: string | null;

  @ApiProperty()
  associationId: string;

  @ApiProperty()
  animalId: string;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiHideProperty()
  requestedByUser?: UserDTO;

  @ApiHideProperty()
  animal?: AnimalDTO;
}
