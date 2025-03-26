import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CancelAdoptionRequestService } from './cancelAdoptionRequest.service';

import User from '@/module/user/domain/user/user.domain';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/adoption/:id/cancel')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard)
export class CancelAdoptionRequestController {
  constructor(private readonly useCase: CancelAdoptionRequestService) {}

  @Put()
  async handle(@GetUser() user: User, @Param('id') id: string) {
    return this.useCase.execute({ id, userId: user.id.toValue() });
  }
}
