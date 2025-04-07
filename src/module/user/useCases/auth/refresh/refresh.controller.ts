import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RefreshService } from './refresh.service';

import User from '@/module/user/domain/user/user.domain';
import UserMapper from '@/module/user/mappers/user.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtRefreshGuard } from '@/shared/guards/jwtRefresh.guard';

@Controller('/refresh')
@ApiTags('auth')
@UseGuards(JwtRefreshGuard)
export class RefreshController {
  constructor(private readonly useCase: RefreshService) {}

  @Post()
  async handle(@GetUser() user: User) {
    const result = await this.useCase.execute(user.id?.toValue());

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { tokens: result.tokens, user: UserMapper.toDTO(result.user) };
  }
}
