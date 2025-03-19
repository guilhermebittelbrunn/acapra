import { Controller, Post, UseGuards } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { ApiTags } from '@nestjs/swagger';
import UserMapper from '@/module/user/mappers/user.mapper';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import User from '@/module/user/domain/user/user.domain';
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
