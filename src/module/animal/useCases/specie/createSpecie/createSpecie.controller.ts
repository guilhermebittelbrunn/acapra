import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSpecieService } from './createSpecie.service';
import { CreateSpecieDTO } from './dto/createSpecie.dto';

import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import SpecieMapper from '@/module/animal/mappers/specie.mapper';
import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreateSpecieController {
  constructor(private readonly useCase: CreateSpecieService) {}

  @Post()
  async handle(@ValidatedBody() body: CreateSpecieDTO, @GetUser() user: User): Promise<SpecieDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };
    const result = await this.useCase.execute(payload);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return SpecieMapper.toDTO(result);
  }
}
