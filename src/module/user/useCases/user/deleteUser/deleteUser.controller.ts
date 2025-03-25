import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteUserService } from './deleteUser.service';

import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class DeleteUserController {
  constructor(private readonly useCase: DeleteUserService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') userId: string, @GetUser() user: User): Promise<void> {
    if (user.id.equalsRaw(userId)) {
      throw new GenericException('Você não pode deletar seu próprio usuário', HttpStatus.FORBIDDEN);
    }

    const result = await this.useCase.execute(userId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }
  }
}
