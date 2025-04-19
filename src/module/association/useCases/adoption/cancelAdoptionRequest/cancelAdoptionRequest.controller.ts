import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CancelAdoptionRequestService } from './cancelAdoptionRequest.service';

import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedParams } from '@/shared/decorators';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/adoption/:id/cancel')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard)
export class CancelAdoptionRequestController {
  constructor(private readonly useCase: CancelAdoptionRequestService) {}

  @Put()
  async handle(@GetUser() user: User, @ValidatedParams('id') id: string) {
    const result = await this.useCase.execute({ id, userId: user.id.toValue() });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
