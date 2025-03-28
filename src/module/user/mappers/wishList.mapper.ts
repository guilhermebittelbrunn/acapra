import { WishListModel } from '@prisma/client';

import WishList from '../domain/wishList.domain';
import { WishListDTO } from '../dto/wishList.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface WishListModelWithRelations extends WishListModel {}

class BaseWishListMapper extends Mapper<WishList, WishListModelWithRelations, WishListDTO> {
  toDomain(wishList: WishListModelWithRelations): WishList {
    return WishList.create(
      {
        userId: new UniqueEntityID(wishList.userId),
        animalId: new UniqueEntityID(wishList.animalId),
        deleted: wishList.deleted,
        createdAt: wishList.createdAt,
        updatedAt: wishList.updatedAt,
      },
      new UniqueEntityID(wishList.id),
    ) as WishList;
  }
  async toPersistence(wishList: WishList): Promise<WishListModelWithRelations> {
    return {
      id: wishList.id.toValue(),
      userId: wishList.userId.toValue(),
      animalId: wishList.animalId.toValue(),
      deleted: wishList.deleted,
      createdAt: wishList.createdAt,
      updatedAt: wishList.updatedAt,
    };
  }
  toDTO(wishList: WishList): WishListDTO {
    return {
      id: wishList.id.toValue(),
      userId: wishList.userId.toValue(),
      animalId: wishList.animalId.toValue(),
      createdAt: wishList.createdAt,
      updatedAt: wishList.updatedAt,
    };
  }
}

const WishListMapper = new BaseWishListMapper();

export default WishListMapper;
