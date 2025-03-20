import AnimalDTO from '@/module/animal/dto/animal.dto';
import { BreedDTO } from '@/module/animal/dto/breed.dto';
import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import { PublicationDTO } from '@/module/association/dto/publication.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindAnimalByIdResponseDTO extends AnimalDTO {
  @ApiProperty()
  specie?: SpecieDTO;

  @ApiProperty()
  breed?: BreedDTO;

  @ApiProperty()
  publication?: PublicationDTO | null;
}
