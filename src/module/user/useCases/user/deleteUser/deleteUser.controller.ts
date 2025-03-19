import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { DeleteUserService } from './deleteUser.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import { GenericException } from '@/shared/core/logic/GenericException';

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

    await this.useCase.execute(userId);
  }
}
