import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListAnimalsByAssociationDTO } from './dto/listAnimalsByAssociation.dto';
import { ListAnimalsByAssociationService } from './listAnimalsByAssociation.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import AnimalDTO from '@/module/animal/dto/animal.dto';
import AnimalMapper from '@/module/animal/mappers/animal.mapper';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListAnimalsByAssociationController {
  constructor(private readonly useCase: ListAnimalsByAssociationService) {}

  @Get()
  @ApiListResponse(AnimalDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListAnimalsByAssociationDTO,
  ): Promise<PaginatedResult<AnimalDTO>> {
    const payload = { ...query, userId: user.id.toValue(), associationId: user.associationId.toValue() };
    const result = await this.useCase.execute(payload);

    return {
      data: result.data.map(AnimalMapper.toDTO),
      meta: result.meta,
    };
  }
}
