import { PaginationQuery } from '@/repositories/base.repository.interface';
import { ValidatedIds } from '@/shared/decorators/validatedIds.decorator';
import { ValidatedEnum } from '@/shared/decorators/validatedTypes.decorator';
import { AnimalGenderEnum, AnimalStatusEnum } from '@/shared/types/animal';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListAnimalsByAssociationDTO extends PaginationQuery {
  @IsOptional()
  @ValidatedIds()
  ids?: string[];

  @IsOptional()
  @ValidatedIds()
  specieIds?: string[];

  @IsOptional()
  @ValidatedIds()
  breedIds?: string[];

  @IsOptional()
  @ValidatedEnum('status', AnimalStatusEnum, { each: true })
  statuses?: AnimalStatusEnum[];

  @IsOptional()
  @ValidatedEnum('genêro', AnimalGenderEnum, { each: true })
  genders?: AnimalGenderEnum[];

  @ApiHideProperty()
  associationId: string;
}
