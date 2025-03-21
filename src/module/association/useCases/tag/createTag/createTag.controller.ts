import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTagService } from './createTag.service';
import { CreateTagDTO } from './dto/createTag.dto';

import { TagDTO } from '@/module/association/dto/tag.dto';
import TagMapper from '@/module/association/mappers/tag.mapper';
import User from '@/module/user/domain/user/user.domain';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/tag')
@ApiTags('tag')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreateTagController {
  constructor(private readonly useCase: CreateTagService) {}

  @Post()
  async handle(@ValidatedBody() body: CreateTagDTO, @GetUser() user: User): Promise<TagDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };
    const tag = await this.useCase.execute(payload);

    return TagMapper.toDTO(tag);
  }
}
