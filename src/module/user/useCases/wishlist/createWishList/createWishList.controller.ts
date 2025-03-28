import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateWishListService } from './createWishList.service';
import { CreateWishListDTO } from './dto/createWishList.dto';

import User from '@/module/user/domain/user/user.domain';
import WishListMapper from '@/module/user/mappers/wishList.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/wish-list')
@ApiTags('wishList')
@UseGuards(JwtAuthGuard)
export class CreateWishListController {
  constructor(private readonly useCase: CreateWishListService) {}

  @Post()
  async handle(@ValidatedBody() body: CreateWishListDTO, @GetUser() user: User) {
    const result = await this.useCase.execute({ ...body, userId: user.id.toValue() });

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return WishListMapper.toDTO(result);
  }
}
