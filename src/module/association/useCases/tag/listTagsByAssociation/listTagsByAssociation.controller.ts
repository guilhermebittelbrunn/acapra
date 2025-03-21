import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListTagsByAssociationDTO } from './dto/listTagsByAssociation.dto';
import { ListTagsByAssociationService } from './listTagsByAssociation.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { TagDTO } from '@/module/association/dto/tag.dto';
import TagMapper from '@/module/association/mappers/tag.mapper';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/tag')
@ApiTags('tag')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListTagsByAssociationController {
  constructor(private readonly useCase: ListTagsByAssociationService) {}

  @Get()
  @ApiListResponse(TagDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListTagsByAssociationDTO,
  ): Promise<PaginatedResult<TagDTO>> {
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data.map(TagMapper.toDTO),
      meta: result.meta,
    };
  }
}
