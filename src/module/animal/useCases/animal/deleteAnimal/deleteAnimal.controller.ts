import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteAnimalService } from './deleteAnimal.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class DeleteAnimalController {
  constructor(private readonly useCase: DeleteAnimalService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@ValidatedParams('id') animalId: string): Promise<void> {
    const result = await this.useCase.execute(animalId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }
  }
}
