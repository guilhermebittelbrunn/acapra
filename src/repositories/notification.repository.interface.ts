import { IBaseRepository, PaginatedResult, PaginationQuery } from './base.repository.interface';

import Notification from '@/module/shared/domain/notification/notification.domain';

export interface ListNotificationsQuery extends PaginationQuery {
  associationId?: string;
  userId?: string;
}

export interface INotificationRepository extends IBaseRepository<Notification> {
  list(query: ListNotificationsQuery): Promise<PaginatedResult<Notification>>;
}

export const INotificationRepositorySymbol = Symbol('INotificationRepository');
