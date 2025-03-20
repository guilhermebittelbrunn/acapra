import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { SpecieBaseDTO } from './specieBase.dto';

export class SpecieDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sequence: number | null;

  @ApiProperty()
  associationId: string;

  @ApiProperty()
  specieBaseId: string;

  @ApiProperty()
  enabled: boolean;

  @ApiHideProperty()
  specieBase?: SpecieBaseDTO;
}
