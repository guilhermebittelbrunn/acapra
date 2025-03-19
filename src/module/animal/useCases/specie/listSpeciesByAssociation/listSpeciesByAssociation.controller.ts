import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListSpeciesByAssociationService } from './listSpeciesByAssociation.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { ListSpecieByAssociationDTO } from './dto/listSpeciesByAssociation.dto';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import SpecieMapper from '@/module/animal/mappers/specie.mapper';

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
