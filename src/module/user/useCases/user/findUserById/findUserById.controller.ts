import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import UserMapper from '@/module/user/mappers/user.mapper';
import { FindUserByIdService } from './findUserById.service';
import { FindUserByIdResponseDTO } from './dto/findUserById.response.dto';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindUserByIdController {
  constructor(private readonly useCase: FindUserByIdService) {}

  @Get('/:id')
  async handle(@Param('id') id: string): Promise<FindUserByIdResponseDTO> {
    const user = await this.useCase.execute(id);

    return UserMapper.toDTO(user);
  }
}
