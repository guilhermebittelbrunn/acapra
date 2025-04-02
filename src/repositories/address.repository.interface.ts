import { IBaseRepository } from './base.repository.interface';

import Address from '@/module/shared/domain/address.domain,';

export interface IAddressRepository extends IBaseRepository<Address> {}

export const IAddressRepositorySymbol = Symbol('IAddressRepository');
