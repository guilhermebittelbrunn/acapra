import { Inject, Injectable } from '@nestjs/common';

import { IAddressRepository, IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class FindAddressByIdService {
  constructor(@Inject(IAddressRepositorySymbol) private readonly addressRepo: IAddressRepository) {}

  async execute(id: string) {
    const address = await this.addressRepo.findById(id);

    if (!address) {
      return new GenericErrors.NotFound(`Endereço com id ${id} não encontrado`);
    }

    return address;
  }
}
