import { ApiProperty } from '@nestjs/swagger';

import AnimalDTO from '@/module/animal/dto/animal.dto';
import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import { PublicationDTO } from '@/module/association/dto/publication.dto';

export class FindAnimalByIdResponseDTO extends AnimalDTO {
  @ApiProperty()
  specie?: SpecieDTO;

  @ApiProperty()
  publication?: PublicationDTO | null;
}
