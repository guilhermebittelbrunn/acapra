import { Inject, Injectable } from '@nestjs/common';

import { CreateAssociationAddressDTO } from './dto/createAssociationAddress.dto';

import Address from '@/module/shared/domain/address.domain';
import { IAddressRepository, IAddressRepositorySymbol } from '@/repositories/address.repository.interface';
import {
  IAssociationRepository,
  IAssociationRepositorySymbol,
} from '@/repositories/association.repository.interface';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import GenericErrors from '@/shared/core/logic/GenericErrors';

@Injectable()
export class CreateAssociationAddressService {
  constructor(
    @Inject(IAssociationRepositorySymbol) private readonly associationRepo: IAssociationRepository,
    @Inject(IAddressRepositorySymbol) private readonly addressRepo: IAddressRepository,
  ) {}

  async execute({ associationId, ...rest }: CreateAssociationAddressDTO) {
    const association = await this.associationRepo.findById(associationId);

    if (!association) {
      return new GenericErrors.NotFound(`Associação com id ${associationId} não encontrada`);
    }

    const addressOrError = Address.create(rest);

    if (addressOrError instanceof GenericAppError) {
      return addressOrError;
    }

    const addressRaw = await this.addressRepo.create(addressOrError);

    association.addressId = addressOrError.id;

    await this.associationRepo.update(association);

    return addressRaw;
  }
}
