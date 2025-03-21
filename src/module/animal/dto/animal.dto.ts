import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { SpecieDTO } from './specie.dto';

import { PublicationDTO } from '@/module/association/dto/publication.dto';
import { AnimalGenderEnum, AnimalSizeEnum, AnimalStatusEnum } from '@/shared/types/animal';

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
  weight?: number | null;

  @ApiProperty()
  size: AnimalSizeEnum;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  associationId: string;

  @ApiProperty()
  specieId: string;

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
  publication?: PublicationDTO | null;
}
