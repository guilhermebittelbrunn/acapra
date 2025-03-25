import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindSpecieByIdResponseDTO } from './dto/findSpecieById.response.dto';
import { FindSpecieByIdService } from './findSpecieById.service';

import SpecieMapper from '@/module/animal/mappers/specie.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindSpecieByIdController {
  constructor(private readonly useCase: FindSpecieByIdService) {}

  @Get('/:id')
  async handle(@Param('id') specieId: string): Promise<FindSpecieByIdResponseDTO> {
    const result = await this.useCase.execute(specieId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return SpecieMapper.toDTO(result);
  }
}
