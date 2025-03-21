import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PaginationQuery } from '@/repositories/base.repository.interface';
import { ValidatedIds } from '@/shared/decorators/validatedIds.decorator';
import { ValidatedEnum } from '@/shared/decorators/validatedTypes.decorator';
import { AnimalGenderEnum, AnimalSizeEnum, AnimalStatusEnum } from '@/shared/types/animal';

export class ListAnimalsByAssociationDTO extends PaginationQuery {
  @IsOptional()
  @ValidatedIds()
  ids?: string[];

  @IsOptional()
  @ValidatedIds()
  specieIds?: string[];

  @IsOptional()
  @ValidatedEnum('status', AnimalStatusEnum, { each: true })
  statuses?: AnimalStatusEnum[];

  @IsOptional()
  @ValidatedEnum('genêro', AnimalGenderEnum, { each: true })
  genders?: AnimalGenderEnum[];

  @IsOptional()
  @ValidatedEnum('tamanho', AnimalGenderEnum, { each: true })
  sizes?: AnimalSizeEnum[];

  @ApiHideProperty()
  associationId: string;
}
