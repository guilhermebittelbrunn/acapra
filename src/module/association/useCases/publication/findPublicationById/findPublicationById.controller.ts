import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { FindPublicationByIdService } from './findPublicationById.service';
import { PublicationDTO } from '@/module/association/dto/publication.dto';
import PublicationMapper from '@/module/association/mappers/publication.mapper';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindPublicationByIdController {
  constructor(private readonly useCase: FindPublicationByIdService) {}

  @Get('/:id')
  async handle(@Param('id') publicationId: string): Promise<PublicationDTO> {
    const publication = await this.useCase.execute(publicationId);

    return PublicationMapper.toDTO(publication);
  }
}
