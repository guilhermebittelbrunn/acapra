import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListBreedsDTO } from './dto/listBreeds.dto';
import { ListBreedsService } from './listBreeds.service';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import AnimalDTO from '@/module/animal/dto/animal.dto';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/animal/breeds')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListBreedsController {
  constructor(private readonly useCase: ListBreedsService) {}

  @Get()
  @ApiListResponse(AnimalDTO)
  async handle(@ValidatedQuery() query?: ListBreedsDTO): Promise<PaginatedResult<string>> {
    const result = await this.useCase.execute(query);

    return {
      data: result.data,
      meta: result.meta,
    };
  }
}
