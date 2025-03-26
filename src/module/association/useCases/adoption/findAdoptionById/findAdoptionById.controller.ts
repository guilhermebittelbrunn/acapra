import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindAdoptionByIdResponseDTO } from './dto/findAdoptionByIdResponse.dto';
import { FindAdoptionByIdService } from './findAdoptionById.service';

import AdoptionMapper from '@/module/association/mappers/adoption.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/adoption')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindAdoptionByIdController {
  constructor(private readonly useCase: FindAdoptionByIdService) {}

  @Get(':id')
  async handle(@Param('id') id: string): Promise<FindAdoptionByIdResponseDTO> {
    const result = await this.useCase.execute(id);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AdoptionMapper.toDTO(result);
  }
}
