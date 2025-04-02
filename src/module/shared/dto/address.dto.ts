import { ApiProperty } from '@nestjs/swagger';

export class AddressDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  country?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  addressNumber?: string;

  @ApiProperty()
  cep?: string;

  @ApiProperty()
  complement?: string;

  @ApiProperty()
  neighborhood?: string;
}
