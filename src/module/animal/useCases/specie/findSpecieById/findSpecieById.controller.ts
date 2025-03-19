import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindSpecieByIdService } from './findSpecieById.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import SpecieMapper from '@/module/animal/mappers/specie.mapper';
import { SpecieDTO } from '@/module/animal/dto/specie.dto';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindSpecieByIdController {
  constructor(private readonly useCase: FindSpecieByIdService) {}

  @Get('/:id')
  async handle(@Param('id') specieId: string): Promise<SpecieDTO> {
    const specie = await this.useCase.execute(specieId);

    return SpecieMapper.toDTO(specie);
  }
}
