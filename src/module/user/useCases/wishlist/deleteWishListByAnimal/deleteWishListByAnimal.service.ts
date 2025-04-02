import { Inject, Injectable } from '@nestjs/common';

import { DeleteWishListByAnimalDTO } from './dto/deleteWishListByAnimal.dto';

import { IWishListRepository, IWishListRepositorySymbol } from '@/repositories/wishList.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class DeleteWishListByAnimalService {
  constructor(@Inject(IWishListRepositorySymbol) private readonly wishListRepo: IWishListRepository) {}

  async execute({ animalId, userId }: DeleteWishListByAnimalDTO) {
    const wishList = await this.wishListRepo.findByIdentifier({ animalId, userId });

    if (!wishList) {
      return new GenericErrors.NotFound(`Animal com id ${animalId} não encontrado`);
    }

    const deleted = await this.wishListRepo.delete(wishList.id.toValue());

    if (!deleted) {
      return new GenericErrors.NotFound(`Lista de favoritos não encontrada`);
    }
  }
}
