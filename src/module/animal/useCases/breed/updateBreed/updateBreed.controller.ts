import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateBreedDTO } from './dto/updateBreed.dto';
import { UpdateBreedService } from './updateBreed.service';

import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/breed')
@ApiTags('breed')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateBreedController {
  constructor(private readonly useCase: UpdateBreedService) {}

  @Put('/:id')
  async handle(
    @ValidatedBody() body: UpdateBreedDTO,
    @Param('id') breedId: string,
  ): Promise<UpdateResponseDTO> {
    const id = await this.useCase.execute({ ...body, id: breedId });

    return { id };
  }
}
