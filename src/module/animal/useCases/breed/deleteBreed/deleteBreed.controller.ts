import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteBreedService } from './deleteBreed.service';

import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/breed')
@ApiTags('breed')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class DeleteBreedController {
  constructor(private readonly useCase: DeleteBreedService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') breedId: string): Promise<void> {
    await this.useCase.execute(breedId);
  }
}
