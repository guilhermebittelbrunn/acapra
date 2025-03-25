import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindPublicationByIdService } from './findPublicationById.service';

import { PublicationDTO } from '@/module/association/dto/publication.dto';
import PublicationMapper from '@/module/association/mappers/publication.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindPublicationByIdController {
  constructor(private readonly useCase: FindPublicationByIdService) {}

  @Get('/:id')
  async handle(@Param('id') publicationId: string): Promise<PublicationDTO> {
    const result = await this.useCase.execute(publicationId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return PublicationMapper.toDTO(result);
  }
}
