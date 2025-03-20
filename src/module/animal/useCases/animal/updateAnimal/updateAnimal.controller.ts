import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateAnimalDTO } from './dto/updateAnimal.dto';
import { UpdateAnimalService } from './updateAnimal.service';

import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateAnimalController {
  constructor(private readonly useCase: UpdateAnimalService) {}

  @Put('/:id')
  async handle(
    @ValidatedBody() body: UpdateAnimalDTO,
    @Param('id') animalId: string,
  ): Promise<UpdateResponseDTO> {
    const id = await this.useCase.execute({ ...body, id: animalId });

    return { id };
  }
}
