import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestAdoptionDTO } from './dto/requestAdoption.dto';
import { RequestAdoptionService } from './requestAdoption.service';

import { AdoptionDTO } from '@/module/association/dto/adoption.dto';
import AdoptionMapper from '@/module/association/mappers/adoption.mapper';
import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/adoption')
@ApiTags('adoption')
@UseGuards(JwtAuthGuard)
export class RequestAdoptionController {
  constructor(private readonly useCase: RequestAdoptionService) {}

  @Post()
  async handle(@ValidatedBody() body: RequestAdoptionDTO, @GetUser() user: User): Promise<AdoptionDTO> {
    const result = await this.useCase.execute({ ...body, user });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AdoptionMapper.toDTO(result);
  }
}
