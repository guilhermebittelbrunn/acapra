import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeletePublicationService } from './deletePublication.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class DeletePublicationController {
  constructor(private readonly useCase: DeletePublicationService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') publicationId: string): Promise<void> {
    const result = await this.useCase.execute(publicationId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }
  }
}
