import { NotificationTypeEnum } from '@/shared/types/shared';

export class EmitNotificationDTO {
  title: string;
  description?: string;
  associationId?: string;
  userId?: string;
  type?: NotificationTypeEnum;
}
