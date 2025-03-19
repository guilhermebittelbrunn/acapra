import { ApiProperty } from '@nestjs/swagger';

export class PublicationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  associationId: string | null;

  @ApiProperty()
  enabled: boolean;
}
