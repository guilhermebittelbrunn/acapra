import { ApiHideProperty } from '@nestjs/swagger';

import { AddressDTO } from '@/module/shared/dto/address.dto';

export class UpdateAddressDTO extends AddressDTO {
  @ApiHideProperty()
  id: string;
}
