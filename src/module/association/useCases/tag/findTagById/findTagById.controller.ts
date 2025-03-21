import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindTagByIdService } from './findTagById.service';

import { TagDTO } from '@/module/association/dto/tag.dto';
import TagMapper from '@/module/association/mappers/tag.mapper';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/tag')
@ApiTags('tag')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindTagByIdController {
  constructor(private readonly useCase: FindTagByIdService) {}

  @Get('/:id')
  async handle(@Param('id') tagId: string): Promise<TagDTO> {
    const tag = await this.useCase.execute(tagId);

    return TagMapper.toDTO(tag);
  }
}
