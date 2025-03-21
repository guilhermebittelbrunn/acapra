import { NotificationModel } from '@prisma/client';

import Notification from '../domain/notification/notification.domain';
import NotificationType from '../domain/notification/notificationType.domain';
import { NotificationDTO } from '../dto/notification.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { NotificationTypeEnum } from '@/shared/types/shared';

export interface NotificationModelWithRelations extends NotificationModel {}

class BaseNotificationMapper extends Mapper<Notification, NotificationModelWithRelations, NotificationDTO> {
  toDomain(notification: NotificationModelWithRelations): Notification {
    return Notification.create(
      {
        title: notification.title,
        description: notification.description,
        associationId: new UniqueEntityID(notification.associationId),
        userId: new UniqueEntityID(notification.userId),
        isRead: notification.isRead,
        type: NotificationType.create(notification.type as NotificationTypeEnum) as NotificationType,
        deleted: notification.deleted,
        createdAt: notification.createdAt,
        updatedAt: notification.updatedAt,
      },
      new UniqueEntityID(notification.id),
    ) as Notification;
  }
  async toPersistence(notification: Notification): Promise<NotificationModelWithRelations> {
    return {
      id: notification.id.toValue(),
      associationId: notification.associationId.toValue(),
      userId: notification.userId.toValue(),
      title: notification.title,
      description: notification.description,
      type: notification.type.value,
      isRead: notification.isRead,
      deleted: notification.deleted,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }
  toDTO(notification: Notification): NotificationDTO {
    return {
      id: notification.id.toValue(),
      title: notification.title,
      type: notification.type.value,
      description: notification.description,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    };
  }
}

const NotificationMapper = new BaseNotificationMapper();

export default NotificationMapper;
