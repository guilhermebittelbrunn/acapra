import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { TagDTO } from './tag.dto';

export class TagAnimalDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tagId: string;

  @ApiProperty()
  animalId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiHideProperty()
  tag?: TagDTO;
}
