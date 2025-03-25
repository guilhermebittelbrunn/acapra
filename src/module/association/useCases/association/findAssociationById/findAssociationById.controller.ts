import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindAssociationByIdService } from './findAssociationById.service';

import { AssociationDTO } from '@/module/association/dto/association.dto';
import AssociationMapper from '@/module/association/mappers/association.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/association')
@ApiTags('association')
@UseGuards(JwtAuthGuard)
export class FindAssociationByIdController {
  constructor(private readonly useCase: FindAssociationByIdService) {}

  @Get('/:id')
  async handle(@Param('id') associationId: string): Promise<AssociationDTO> {
    const result = await this.useCase.execute(associationId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AssociationMapper.toDTO(result);
  }
}
