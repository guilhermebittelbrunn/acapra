import { ApiProperty } from '@nestjs/swagger';

export class TagDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  associationId: string | null;

  @ApiProperty()
  enabled: boolean;
}
