import { Inject, Injectable } from '@nestjs/common';

import { ListNotificationsDTO } from './dto/ListNotificationsDTO';

import {
  INotificationRepository,
  INotificationRepositorySymbol,
} from '@/repositories/notification.repository.interface';

@Injectable()
export class ListNotificationsService {
  constructor(
    @Inject(INotificationRepositorySymbol) private readonly notificationRepo: INotificationRepository,
  ) {}

  async execute(dto: ListNotificationsDTO) {
    return this.notificationRepo.list(dto);
  }
}
