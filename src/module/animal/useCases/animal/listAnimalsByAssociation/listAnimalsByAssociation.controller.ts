import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import AnimalMapper from '@/module/animal/mappers/animal.mapper';
import AnimalDTO from '@/module/animal/dto/animal.dto';
import { ListAnimalsByAssociationService } from './listAnimalsByAssociation.service';
import { ListAnimalsByAssociationDTO } from './dto/listAnimalsByAssociation.dto';

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
    const result = await this.useCase.execute({ ...query, associationId: user.associationId.toValue() });

    return {
      data: result.data.map(AnimalMapper.toDTO),
      meta: result.meta,
    };
  }
}
