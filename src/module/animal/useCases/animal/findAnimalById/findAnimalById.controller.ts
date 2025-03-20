import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindAnimalByIdService } from './findAnimalById.service';

import AnimalDTO from '@/module/animal/dto/animal.dto';
import AnimalMapper from '@/module/animal/mappers/animal.mapper';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindAnimalByIdController {
  constructor(private readonly useCase: FindAnimalByIdService) {}

  @Get('/:id')
  async handle(@Param('id') animalId: string): Promise<AnimalDTO> {
    const animal = await this.useCase.execute(animalId);

    return AnimalMapper.toDTO(animal);
  }
}
