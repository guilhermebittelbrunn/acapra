import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteSpecieService } from './deleteSpecie.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class DeleteSpecieController {
  constructor(private readonly useCase: DeleteSpecieService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') specieId: string): Promise<void> {
    const result = await this.useCase.execute(specieId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }
  }
}
