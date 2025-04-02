import { ApiHideProperty } from '@nestjs/swagger';

import { AddressDTO } from '@/module/shared/dto/address.dto';

export class CreateAssociationAddressDTO extends AddressDTO {
  @ApiHideProperty()
  associationId: string;
}
