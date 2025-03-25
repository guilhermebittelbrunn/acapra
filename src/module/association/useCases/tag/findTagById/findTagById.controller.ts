import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindTagByIdService } from './findTagById.service';

import { TagDTO } from '@/module/association/dto/tag.dto';
import TagMapper from '@/module/association/mappers/tag.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/tag')
@ApiTags('tag')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindTagByIdController {
  constructor(private readonly useCase: FindTagByIdService) {}

  @Get('/:id')
  async handle(@Param('id') tagId: string): Promise<TagDTO> {
    const result = await this.useCase.execute(tagId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return TagMapper.toDTO(result);
  }
}
