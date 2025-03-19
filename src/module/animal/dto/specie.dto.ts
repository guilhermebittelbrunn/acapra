import { ApiProperty } from '@nestjs/swagger';

export class SpecieDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sequence: number | null;

  @ApiProperty()
  associationId: string | null;

  @ApiProperty()
  enabled: boolean;
}
