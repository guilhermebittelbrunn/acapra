import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateTagDTO } from './dto/updateTag.dto';
import { UpdateTagService } from './updateTag.service';

import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/tag')
@ApiTags('tag')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateTagController {
  constructor(private readonly useCase: UpdateTagService) {}

  @Put('/:id')
  async handle(@ValidatedBody() body: UpdateTagDTO, @Param('id') tagId: string): Promise<UpdateResponseDTO> {
    const id = await this.useCase.execute({ ...body, id: tagId });

    return { id };
  }
}
