import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { ValidatedEnum } from '@/shared/decorators/validatedTypes.decorator';
import { IsOptional } from 'class-validator';
import { AnimalStatusEnum } from '@/shared/types/animal';
import { CreateAnimalDTO } from '../../createAnimal/dto/createAnimal.dto';

export class UpdateAnimalDTO extends PartialType(CreateAnimalDTO) {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @ValidatedEnum('status', AnimalStatusEnum)
  status?: AnimalStatusEnum;
}
