import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserService } from './updateUser.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { UpdateResponseDTO } from '@/shared/types/common';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserService) {}

  @Put('/:id')
  async handle(@ValidatedBody() body: UpdateUserDTO, @Param('id') userId: string): Promise<UpdateResponseDTO> {
    const id = await this.useCase.execute({ ...body, id: userId });

    return { id };
  }
}
