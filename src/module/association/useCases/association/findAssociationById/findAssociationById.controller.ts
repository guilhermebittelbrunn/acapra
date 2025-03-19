import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindAssociationByIdService } from './findAssociationById.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import AssociationMapper from '@/module/association/mappers/association.mapper';
import { AssociationDTO } from '@/module/association/dto/association.dto';

@Controller('/association')
@ApiTags('association')
@UseGuards(JwtAuthGuard)
export class FindAssociationByIdController {
  constructor(private readonly useCase: FindAssociationByIdService) {}

  @Get('/:id')
  async handle(@Param('id') associationId: string): Promise<AssociationDTO> {
    const association = await this.useCase.execute(associationId);

    return AssociationMapper.toDTO(association);
  }
}
