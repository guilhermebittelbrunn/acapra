import { ApiProperty } from '@nestjs/swagger';

import { NotificationTypeEnum } from '@/shared/types/shared';

export class NotificationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: NotificationTypeEnum;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  createdAt: Date;
}
