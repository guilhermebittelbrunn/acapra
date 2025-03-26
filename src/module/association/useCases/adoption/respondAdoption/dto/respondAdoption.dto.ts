import { ApiHideProperty } from '@nestjs/swagger';

import { ValidatedEnum } from '@/shared/decorators/validatedTypes.decorator';
import { AdoptionStatusEnum } from '@/shared/types/association';

export class RespondAdoptionDTO {
  @ValidatedEnum('status', AdoptionStatusEnum)
  status: AdoptionStatusEnum;

  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  userId: string;
}
