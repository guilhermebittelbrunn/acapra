import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { UpdateResponseDTO } from '@/shared/types/common';
import { UpdatePublicationDTO } from './dto/updatePublication.dto';
import { UpdatePublicationService } from './updatePublication.service';

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
    const id = await this.useCase.execute({ ...body, id: publicationId });

    return { id };
  }
}
