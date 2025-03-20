import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListPublicationByAssociationDTO } from './dto/listPublicationsByAssociation.dto';
import { ListPublicationsByAssociationService } from './listPublicationsByAssociation.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { PublicationDTO } from '@/module/association/dto/publication.dto';
import PublicationMapper from '@/module/association/mappers/publication.mapper';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListPublicationsByAssociationController {
  constructor(private readonly useCase: ListPublicationsByAssociationService) {}

  @Get()
  @ApiListResponse(PublicationDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListPublicationByAssociationDTO,
  ): Promise<PaginatedResult<PublicationDTO>> {
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data.map(PublicationMapper.toDTO),
      meta: result.meta,
    };
  }
}
