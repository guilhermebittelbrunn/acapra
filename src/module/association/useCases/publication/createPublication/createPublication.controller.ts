import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePublicationService } from './createPublication.service';
import { CreatePublicationDTO } from './dto/createPublication.dto';

import { PublicationDTO } from '@/module/association/dto/publication.dto';
import PublicationMapper from '@/module/association/mappers/publication.mapper';
import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreatePublicationController {
  constructor(private readonly useCase: CreatePublicationService) {}

  @Post()
  async handle(@ValidatedBody() body: CreatePublicationDTO, @GetUser() user: User): Promise<PublicationDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };
    const result = await this.useCase.execute(payload);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return PublicationMapper.toDTO(result);
  }
}
