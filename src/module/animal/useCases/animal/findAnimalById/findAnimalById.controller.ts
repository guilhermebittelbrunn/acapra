import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindAnimalByIdService } from './findAnimalById.service';

import AnimalDTO from '@/module/animal/dto/animal.dto';
import AnimalMapper from '@/module/animal/mappers/animal.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindAnimalByIdController {
  constructor(private readonly useCase: FindAnimalByIdService) {}

  @Get('/:id')
  async handle(@ValidatedParams('id') animalId: string): Promise<AnimalDTO> {
    const result = await this.useCase.execute(animalId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AnimalMapper.toDTO(result);
  }
}
