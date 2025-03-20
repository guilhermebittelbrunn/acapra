import { AnimalGenderEnum, AnimalStatusEnum } from '@/shared/types/animal';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SpecieDTO } from './specie.dto';
import { BreedDTO } from './breed.dto';
import { PublicationDTO } from '@/module/association/dto/publication.dto';

export default class AnimalDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  age: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  associationId: string;

  @ApiProperty()
  specieId: string;

  @ApiProperty()
  breedId: string;

  @ApiProperty()
  publicationId?: string | null;

  @ApiProperty()
  status: AnimalStatusEnum;

  @ApiProperty()
  gender: AnimalGenderEnum;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiHideProperty()
  specie?: SpecieDTO;

  @ApiHideProperty()
  breed?: BreedDTO;

  @ApiHideProperty()
  publication?: PublicationDTO | null;
}
