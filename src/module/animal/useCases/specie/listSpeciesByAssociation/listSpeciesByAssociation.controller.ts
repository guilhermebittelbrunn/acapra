import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListSpecieByAssociationDTO } from './dto/listSpeciesByAssociation.dto';
import { ListSpeciesByAssociationService } from './listSpeciesByAssociation.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import SpecieMapper from '@/module/animal/mappers/specie.mapper';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListSpeciesByAssociationController {
  constructor(private readonly useCase: ListSpeciesByAssociationService) {}

  @Get()
  @ApiListResponse(SpecieDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListSpecieByAssociationDTO,
  ): Promise<PaginatedResult<SpecieDTO>> {
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data.map(SpecieMapper.toDTO),
      meta: result.meta,
    };
  }
}
