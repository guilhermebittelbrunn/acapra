import { Inject } from '@nestjs/common';

import { EmitNotificationDTO } from './emiNotification.dto';

import Notification from '../../notification.domain';
import NotificationType from '../../notificationType.domain';

import {
  INotificationRepository,
  INotificationRepositorySymbol,
} from '@/repositories/notification.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';

export class EmitNotificationService {
  constructor(
    @Inject(INotificationRepositorySymbol) private readonly notificationRepo: INotificationRepository,
  ) {}

  async execute(dto: EmitNotificationDTO) {
    let notificationType: NotificationType | undefined;

    if (dto?.type) {
      const notificationTypeOrError = NotificationType.create(dto.type);
      if (notificationTypeOrError instanceof GenericAppError) {
        return notificationTypeOrError;
      }

      notificationType = notificationTypeOrError;
    }

    const notification = Notification.create({
      title: dto.title ?? 'Notificação',
      description: dto.description,
      associationId: UniqueEntityID.createOrUndefined(dto.associationId),
      userId: UniqueEntityID.createOrUndefined(dto.userId),
      type: notificationType,
    });

    if (notification instanceof GenericAppError) {
      return notification;
    }

    return this.notificationRepo.create(notification);
  }
}
