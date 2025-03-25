import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteTagService } from './deleteTag.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/tag')
@ApiTags('tag')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class DeleteTagController {
  constructor(private readonly useCase: DeleteTagService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') tagId: string): Promise<void> {
    const result = await this.useCase.execute(tagId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }
  }
}
