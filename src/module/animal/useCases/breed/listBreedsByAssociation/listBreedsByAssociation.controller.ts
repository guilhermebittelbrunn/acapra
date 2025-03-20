import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListBreedsByAssociationDTO } from './dto/listBreedsByAssociation.dto';
import { ListBreedsByAssociationService } from './listBreedsByAssociation.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { BreedDTO } from '@/module/animal/dto/breed.dto';
import BreedMapper from '@/module/animal/mappers/breed.mapper';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/breed')
@ApiTags('breed')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListBreedsByAssociationController {
  constructor(private readonly useCase: ListBreedsByAssociationService) {}

  @Get()
  @ApiListResponse(BreedDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListBreedsByAssociationDTO,
  ): Promise<PaginatedResult<BreedDTO>> {
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data.map(BreedMapper.toDTO),
      meta: result.meta,
    };
  }
}
