import { ApiHideProperty } from '@nestjs/swagger';

export class DeleteWishListByAnimalDTO {
  @ApiHideProperty()
  animalId: string;

  @ApiHideProperty()
  userId: string;
}
