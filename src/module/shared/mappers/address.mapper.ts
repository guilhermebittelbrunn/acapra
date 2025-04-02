import { AddressModel } from '@prisma/client';

import Address from '../domain/address.domain';
import { AddressDTO } from '../dto/address.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

class BaseAddressMapper extends Mapper<Address, AddressModel, AddressDTO> {
  toDomain(address: AddressModel): Address {
    return Address.create(
      {
        country: address.country,
        state: address.state,
        city: address.city,
        street: address.street,
        addressNumber: address.addressNumber,
        cep: address.cep,
        complement: address.complement,
        neighborhood: address.neighborhood,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
        deleted: address.deleted,
      },
      new UniqueEntityID(address.id),
    );
  }
  toPersistence(address: Address): AddressModel {
    return {
      id: address.id.toValue(),
      country: address.country,
      state: address.state,
      city: address.city,
      street: address.street,
      addressNumber: address.addressNumber,
      cep: address.cep,
      complement: address.complement,
      neighborhood: address.neighborhood,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
      deleted: address.deleted,
    };
  }
  toDTO(address: Address): AddressDTO {
    return {
      id: address.id.toValue(),
      country: address.country,
      state: address.state,
      city: address.city,
      street: address.street,
      addressNumber: address.addressNumber,
      cep: address.cep,
      complement: address.complement,
      neighborhood: address.neighborhood,
    };
  }
}

const AddressMapper = new BaseAddressMapper();

export default AddressMapper;
