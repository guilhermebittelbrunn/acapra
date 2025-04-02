import { Inject, Injectable } from '@nestjs/common';

import { UpdateAddressDTO } from './dto/updateAddress.dto';

import Address from '@/module/shared/domain/address.domain,';
import { IAddressRepository, IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';
import { coalesce } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateAddressService {
  constructor(@Inject(IAddressRepositorySymbol) private readonly addressRepo: IAddressRepository) {}

  async execute(dto: UpdateAddressDTO) {
    const address = await this.addressRepo.findById(dto.id);

    if (!address) {
      return new GenericErrors.NotFound(`Endereço com id ${dto.id} não encontrado`);
    }

    const addressOrError = Address.create(
      {
        ...dto,
        street: coalesce(dto.street, address.street),
      },
      address.id,
    );

    if (addressOrError instanceof GenericAppError) {
      return addressOrError;
    }

    await this.addressRepo.create(addressOrError);
  }
}
