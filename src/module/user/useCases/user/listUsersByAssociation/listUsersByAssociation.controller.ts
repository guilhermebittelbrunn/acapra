import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListUsersByAssociationService } from './listUsersByAssociation.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UserDTO } from '@/module/user/dto/user.dto';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { ListUsersByAssociationDTO } from './dto/listUsersByAssociation.dto';
import UserMapper from '@/module/user/mappers/user.mapper';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';

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
