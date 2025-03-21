import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListNotificationsService } from './listNotifications.service';

import { NotificationDTO } from '../../../dto/notification.dto';
import NotificationMapper from '../../../mappers/notification.mapper';

import { ApiListResponse } from '@/infra/openAPI/swagger/decorators/apiListResponse.decorator';
import User from '@/module/user/domain/user/user.domain';
import { PaginatedResult } from '@/repositories/base.repository.interface';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/notification')
@ApiTags('notification')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class ListNotificationsController {
  constructor(private readonly useCase: ListNotificationsService) {}

  @Get()
  @ApiListResponse(NotificationDTO)
  async handle(@GetUser() user: User): Promise<PaginatedResult<NotificationDTO>> {
    const result = await this.useCase.execute({
      userId: user.id.toValue(),
      associationId: user.associationId.toValue(),
    });

    return {
      data: result.data.map(NotificationMapper.toDTO),
      meta: result.meta,
    };
  }
}
