import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateAnimalService } from './createAnimal.service';
import { CreateAnimalDTO } from './dto/createAnimal.dto';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import AnimalDTO from '@/module/animal/dto/animal.dto';
import AnimalMapper from '@/module/animal/mappers/animal.mapper';
import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreateAnimalController {
  constructor(
    private readonly useCase: CreateAnimalService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Post()
  async handle(@ValidatedBody() body: CreateAnimalDTO, @GetUser() user: User): Promise<AnimalDTO> {
    const payload = { ...body, associationId: user?.associationId.toValue() };

    const result = await this.transactionManager.run(() => this.useCase.execute(payload));

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AnimalMapper.toDTO(result);
  }
}
