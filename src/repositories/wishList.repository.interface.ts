import { IBaseRepository } from './base.repository.interface';

import WishList from '@/module/user/domain/wishList.domain';

export interface IWishListRepository extends IBaseRepository<WishList> {}

export const IWishListRepositorySymbol = Symbol('IWishListRepository');
