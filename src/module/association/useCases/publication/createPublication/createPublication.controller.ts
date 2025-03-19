import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { CreatePublicationDTO } from './dto/createPublication.dto';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import User from '@/module/user/domain/user/user.domain';
import { CreatePublicationService } from './createPublication.service';
import { PublicationDTO } from '@/module/association/dto/publication.dto';
import PublicationMapper from '@/module/association/mappers/publication.mapper';

@Controller('/publication')
@ApiTags('publication')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreatePublicationController {
  constructor(private readonly useCase: CreatePublicationService) {}

  @Post()
  async handle(@ValidatedBody() body: CreatePublicationDTO, @GetUser() user: User): Promise<PublicationDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };
    const publication = await this.useCase.execute(payload);

    return PublicationMapper.toDTO(publication);
  }
}
