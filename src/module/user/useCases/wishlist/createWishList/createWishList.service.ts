import { Inject, Injectable } from '@nestjs/common';

import { CreateWishListDTO } from './dto/createWishList.dto';

import WishList from '@/module/user/domain/wishList.domain';
import { IAnimalRepository, IAnimalRepositorySymbol } from '@/repositories/animal.repository.interface';
import { IWishListRepository, IWishListRepositorySymbol } from '@/repositories/wishList.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class CreateWishListService {
  constructor(
    @Inject(IWishListRepositorySymbol) private readonly wishListRepo: IWishListRepository,
    @Inject(IAnimalRepositorySymbol) private readonly animalRepo: IAnimalRepository,
  ) {}

  async execute(dto: CreateWishListDTO) {
    const animal = await this.animalRepo.findById(dto.animalId);

    if (!animal) {
      return new GenericErrors.NotFound(`Animal com id ${dto.animalId} não encontrado`);
    }

    const wishListOrError = WishList.create({
      userId: new UniqueEntityID(dto.userId),
      animalId: new UniqueEntityID(dto.animalId),
    });

    if (wishListOrError instanceof GenericAppError) {
      return wishListOrError;
    }

    return this.wishListRepo.create(wishListOrError);
  }
}
