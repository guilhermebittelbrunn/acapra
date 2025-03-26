import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListAdoptionForUserDTO } from './dto/listAdoptionsForUser.dto';
import { ListAdoptionsForUserService } from './listAdoptionsForUser.service';

import { AdoptionDTO } from '../../../dto/adoption.dto';
import AdoptionMapper from '../../../mappers/adoption.mapper';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import User from '@/module/user/domain/user/user.domain';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedQuery } from '@/shared/decorators/validatedQuery.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/adoption')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard)
export class ListAdoptionsForUserController {
  constructor(private readonly useCase: ListAdoptionsForUserService) {}

  @Get()
  @ApiListResponse(AdoptionDTO)
  async handle(@GetUser() user: User, @ValidatedQuery() query?: ListAdoptionForUserDTO) {
    const result = await this.useCase.execute({ ...query, userId: user.id.toValue() });

    return {
      data: result.data?.map(AdoptionMapper.toDTO),
      meta: result.meta,
    };
  }
}
