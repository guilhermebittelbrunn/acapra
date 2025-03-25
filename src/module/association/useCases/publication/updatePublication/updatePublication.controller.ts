import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdatePublicationDTO } from './dto/updatePublication.dto';
import { UpdatePublicationService } from './updatePublication.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdatePublicationController {
  constructor(private readonly useCase: UpdatePublicationService) {}

  @Put('/:id')
  async handle(
    @ValidatedBody() body: UpdatePublicationDTO,
    @Param('id') publicationId: string,
  ): Promise<UpdateResponseDTO> {
    const result = await this.useCase.execute({ ...body, id: publicationId });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
