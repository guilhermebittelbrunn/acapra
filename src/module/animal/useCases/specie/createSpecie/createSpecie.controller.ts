import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateSpecieService } from './createSpecie.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { SpecieDTO } from '@/module/animal/dto/specie.dto';
import { CreateSpecieDTO } from './dto/createSpecie.dto';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import SpecieMapper from '@/module/animal/mappers/specie.mapper';

@Controller('/specie')
@ApiTags('specie')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreateSpecieController {
  constructor(private readonly useCase: CreateSpecieService) {}

  @Post()
  async handle(@ValidatedBody() body: CreateSpecieDTO, @GetUser() user: User): Promise<SpecieDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };
    const specie = await this.useCase.execute(payload);

    return SpecieMapper.toDTO(specie);
  }
}
