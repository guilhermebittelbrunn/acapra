import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListUsersByAssociationDTO } from './dto/listUsersByAssociation.dto';
import { ListUsersByAssociationService } from './listUsersByAssociation.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import User from '@/module/user/domain/user/user.domain';
import { UserDTO } from '@/module/user/dto/user.dto';
import UserMapper from '@/module/user/mappers/user.mapper';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListUsersByAssociationController {
  constructor(private readonly useCase: ListUsersByAssociationService) {}

  @Get()
  @ApiListResponse(UserDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListUsersByAssociationDTO,
  ): Promise<PaginatedResult<UserDTO>> {
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data.map(UserMapper.toDTO),
      meta: result.meta,
    };
  }
}
