import { IsOptional } from 'class-validator';

import { ValidatedUUID } from '@/shared/decorators/validatedTypes.decorator';

export class ListNotificationsDTO {
  @IsOptional()
  @ValidatedUUID('associação')
  associationId?: string;

  @IsOptional()
  @ValidatedUUID('usuário')
  userId?: string;
}
