import { ApiHideProperty } from '@nestjs/swagger';

import { ValidatedUUID } from '@/shared/decorators/validatedTypes.decorator';

export class CreateWishListDTO {
  @ValidatedUUID('id do animal')
  animalId: string;

  @ApiHideProperty()
  userId: string;
}
