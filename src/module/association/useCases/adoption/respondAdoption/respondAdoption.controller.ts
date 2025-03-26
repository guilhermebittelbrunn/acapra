import { Controller, UseGuards, Put, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RespondAdoptionDTO } from './dto/respondAdoption.dto';
import { RespondAdoptionService } from './respondAdoption.service';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('adoption/respond')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class RespondAdoptionController {
  constructor(
    private readonly useCase: RespondAdoptionService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Put('/:id')
  async handle(@Param('id') id: string, @ValidatedBody() body: RespondAdoptionDTO, @GetUser() user: User) {
    const payload = { ...body, userId: user.id.toValue(), id };
    const result = await this.transactionManager.run(() => this.useCase.execute(payload));

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
