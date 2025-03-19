import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBreedService } from './createBreed.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { CreateBreedDTO } from './dto/createBreed.dto';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import { BreedDTO } from '@/module/animal/dto/breed.dto';
import BreedMapper from '@/module/animal/mappers/breed.mapper';

@Controller('/breed')
@ApiTags('breed')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreateBreedController {
  constructor(private readonly useCase: CreateBreedService) {}

  @Post()
  async handle(@ValidatedBody() body: CreateBreedDTO, @GetUser() user: User): Promise<BreedDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };
    const breed = await this.useCase.execute(payload);

    return BreedMapper.toDTO(breed);
  }
}
