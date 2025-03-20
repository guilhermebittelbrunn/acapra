import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindBreedByIdService } from './findBreedById.service';

import { BreedDTO } from '@/module/animal/dto/breed.dto';
import BreedMapper from '@/module/animal/mappers/breed.mapper';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/breed')
@ApiTags('breed')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindBreedByIdController {
  constructor(private readonly useCase: FindBreedByIdService) {}

  @Get('/:id')
  async handle(@Param('id') breedId: string): Promise<BreedDTO> {
    const breed = await this.useCase.execute(breedId);

    return BreedMapper.toDTO(breed);
  }
}
