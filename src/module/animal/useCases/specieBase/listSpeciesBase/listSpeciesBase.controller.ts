import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListSpeciesBaseDTO } from './dto/listSpeciesBase.dto';
import { ListSpeciesBaseService } from './listSpeciesBase.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { SpecieBaseDTO } from '@/module/animal/dto/specieBase.dto';
import SpecieBaseMapper from '@/module/animal/mappers/specieBase.mapper';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/specie-base')
@ApiTags('specie-base')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListSpeciesBaseController {
  constructor(private readonly useCase: ListSpeciesBaseService) {}

  @Get()
  @ApiListResponse(SpecieBaseDTO)
  async handle(@ValidatedQuery() query?: ListSpeciesBaseDTO): Promise<PaginatedResult<SpecieBaseDTO>> {
    const result = await this.useCase.execute(query);

    return {
      data: result.data.map(SpecieBaseMapper.toDTO),
      meta: result.meta,
    };
  }
}
