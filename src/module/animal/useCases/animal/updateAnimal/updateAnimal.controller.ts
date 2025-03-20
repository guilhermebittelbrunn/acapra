import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { UpdateResponseDTO } from '@/shared/types/common';
import { UpdateAnimalDTO } from './dto/updateAnimal.dto';
import { UpdateAnimalService } from './updateAnimal.service';

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
