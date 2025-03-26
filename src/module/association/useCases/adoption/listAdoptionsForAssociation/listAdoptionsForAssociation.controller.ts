import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListAdoptionForAssociationDTO } from './dto/listAdoptionsForAssociation.dto';
import { ListAdoptionsForAssociationService } from './listAdoptionsForAssociation.service';

import { AdoptionDTO } from '../../../dto/adoption.dto';
import AdoptionMapper from '../../../mappers/adoption.mapper';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import User from '@/module/user/domain/user/user.domain';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/association/:associationId/adoption')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListAdoptionsForAssociationController {
  constructor(private readonly useCase: ListAdoptionsForAssociationService) {}

  @Get()
  @ApiListResponse(AdoptionDTO)
  async handle(@GetUser() user: User, @ValidatedQuery() query?: ListAdoptionForAssociationDTO) {
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data?.map(AdoptionMapper.toDTO),
      meta: result.meta,
    };
  }
}
