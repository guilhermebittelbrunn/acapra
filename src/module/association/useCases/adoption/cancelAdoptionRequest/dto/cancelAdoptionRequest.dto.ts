import { ApiHideProperty } from '@nestjs/swagger';

export class CancelAdoptionRequestDTO {
  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  userId: string;
}
