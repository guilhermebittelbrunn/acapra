import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateSpecieService } from './updateSpecie.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { UpdateResponseDTO } from '@/shared/types/common';
import { UpdateSpecieDTO } from './dto/updateSpecie.dto';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateSpecieController {
  constructor(private readonly useCase: UpdateSpecieService) {}

  @Put('/:id')
  async handle(
    @ValidatedBody() body: UpdateSpecieDTO,
    @Param('id') specieId: string,
  ): Promise<UpdateResponseDTO> {
    const id = await this.useCase.execute({ ...body, id: specieId });

    return { id };
  }
}
