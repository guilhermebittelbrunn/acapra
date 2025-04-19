import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateSpecieDTO } from './dto/updateSpecie.dto';
import { UpdateSpecieService } from './updateSpecie.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody, ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateSpecieController {
  constructor(private readonly useCase: UpdateSpecieService) {}

  @Put('/:id')
  async handle(
    @ValidatedBody() body: UpdateSpecieDTO,
    @ValidatedParams('id') specieId: string,
  ): Promise<UpdateResponseDTO> {
    const result = await this.useCase.execute({ ...body, id: specieId });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
