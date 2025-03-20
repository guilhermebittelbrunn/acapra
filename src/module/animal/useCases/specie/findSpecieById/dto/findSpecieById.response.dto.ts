import { ApiProperty } from '@nestjs/swagger';

import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import { SpecieBaseDTO } from '@/module/animal/dto/specieBase.dto';

export class FindSpecieByIdResponseDTO extends SpecieDTO {
  @ApiProperty()
  specieBase?: SpecieBaseDTO;
}
