import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { SpecieDTO } from './specie.dto';

export class BreedDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sequence: number | null;

  @ApiProperty()
  associationId: string | null;

  @ApiProperty()
  specieId: string | null;

  @ApiProperty()
  enabled: boolean;

  @ApiHideProperty()
  specie?: SpecieDTO;
}
