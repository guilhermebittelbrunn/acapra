import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteWishListByAnimalService } from './deleteWishListByAnimal.service';

import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/wish-list')
@ApiTags('wishList')
@UseGuards(JwtAuthGuard)
export class DeleteWishListByAnimalController {
  constructor(private readonly useCase: DeleteWishListByAnimalService) {}

  @Delete('/:animalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('animalId') animalId: string, @GetUser() user: User): Promise<void> {
    const result = await this.useCase.execute({ animalId, userId: user.id.toValue() });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }
  }
}
