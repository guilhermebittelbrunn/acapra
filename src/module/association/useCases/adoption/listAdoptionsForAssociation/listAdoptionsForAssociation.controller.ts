import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListAdoptionForAssociationDTO } from './dto/listAdoptionsForAssociation.dto';
import { ListAdoptionsForAssociationService } from './listAdoptionsForAssociation.service';

import { AdoptionDTO } from '../../../dto/adoption.dto';
import AdoptionMapper from '../../../mappers/adoption.mapper';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/association')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListAdoptionsForAssociationController {
  constructor(private readonly useCase: ListAdoptionsForAssociationService) {}

  @Get('/:associationId/adoption')
  @ApiListResponse(AdoptionDTO)
  async handle(
    @Param('associationId') associationId: string,
    @ValidatedQuery() query?: ListAdoptionForAssociationDTO,
  ) {
    const result = await this.useCase.execute({ ...query, associationId });

    return {
      data: result.data?.map(AdoptionMapper.toDTO),
      meta: result.meta,
    };
  }
}
