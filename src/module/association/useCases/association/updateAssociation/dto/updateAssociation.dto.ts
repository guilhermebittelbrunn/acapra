import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { CreateAssociationDTO } from '../../createAssociation/dto/createAssociation.dto';

export class UpdateAssociationDTO extends PartialType(CreateAssociationDTO) {
  @ApiHideProperty()
  id: string;
}
