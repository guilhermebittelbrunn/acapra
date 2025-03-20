import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RefreshService } from './refresh.service';

import User from '@/module/user/domain/user/user.domain';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtRefreshGuard } from '@/shared/guards/jwtRefresh.guard';

@Controller('/refresh')
@ApiTags('auth')
@UseGuards(JwtRefreshGuard)
export class RefreshController {
  constructor(private readonly useCase: RefreshService) {}

  @Post()
  async handle(@GetUser() user: User) {
    return this.useCase.execute(user.id?.toValue());
  }
}
