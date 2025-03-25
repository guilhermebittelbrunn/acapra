import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindUserByIdResponseDTO } from './dto/findUserById.response.dto';
import { FindUserByIdService } from './findUserById.service';

import UserMapper from '@/module/user/mappers/user.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindUserByIdController {
  constructor(private readonly useCase: FindUserByIdService) {}

  @Get('/:id')
  async handle(@Param('id') id: string): Promise<FindUserByIdResponseDTO> {
    const result = await this.useCase.execute(id);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return UserMapper.toDTO(result);
  }
}
