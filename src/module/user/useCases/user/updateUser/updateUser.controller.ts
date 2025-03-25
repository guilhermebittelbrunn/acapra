import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateUserDTO } from './dto/updateUser.dto';
import { UpdateUserService } from './updateUser.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserService) {}

  @Put('/:id')
  async handle(@ValidatedBody() body: UpdateUserDTO, @Param('id') userId: string): Promise<UpdateResponseDTO> {
    const result = await this.useCase.execute({ ...body, id: userId });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
