import { ApiProperty } from '@nestjs/swagger';

import { SpecieBaseTypeEnum } from '@/shared/types/animal';

export class SpecieBaseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: SpecieBaseTypeEnum;

  @ApiProperty()
  enabled: boolean;
}
