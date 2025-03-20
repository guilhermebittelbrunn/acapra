import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateAnimalDTO } from '../../createAnimal/dto/createAnimal.dto';

import { ValidatedEnum } from '@/shared/decorators/validatedTypes.decorator';
import { AnimalStatusEnum } from '@/shared/types/animal';

export class UpdateAnimalDTO extends PartialType(CreateAnimalDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedEnum('status', AnimalStatusEnum)
  status?: AnimalStatusEnum;
}
