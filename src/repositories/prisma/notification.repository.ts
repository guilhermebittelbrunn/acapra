import { Injectable } from '@nestjs/common';
import { Prisma, NotificationModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { PaginatedResult } from '../base.repository.interface';
import { INotificationRepository, ListNotificationsQuery } from '../notification.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import Notification from '@/module/shared/domain/notification/notification.domain';
import NotificationMapper from '@/module/shared/mappers/notification.mapper';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class NotificationRepository
  extends BaseRepository<'notificationModel', Notification, NotificationModel>
  implements INotificationRepository
{
  mapper = NotificationMapper;

  constructor(prisma: PrismaService, als: Als) {
    super('notificationModel', prisma, als);
  }

  async list(query: ListNotificationsQuery): Promise<PaginatedResult<Notification>> {
    const { limit, page, skip } = this.getPaginationParams(query);

    const where: Prisma.NotificationModelWhereInput = {
      OR: [{ userId: query.userId ?? null }, { associationId: query.associationId ?? null }],
    };

    const [notifications, total] = await Promise.all([
      this.manager().findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      this.manager().count({ where }),
    ]);

    return {
      data: notifications.map(this.mapper.toDomain),
      meta: this.buildPaginationMeta(total, page, limit),
    };
  }
}
