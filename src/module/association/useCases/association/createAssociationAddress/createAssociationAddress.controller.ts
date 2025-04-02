import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateAssociationAddressService } from './createAssociationAddress.service';
import { CreateAssociationAddressDTO } from './dto/createAssociationAddress.dto';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import { AddressDTO } from '@/module/shared/dto/address.dto';
import AddressMapper from '@/module/shared/mappers/address.mapper';
import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/association/address')
@ApiTags('association')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class CreateAssociationAddressController {
  constructor(
    private readonly useCase: CreateAssociationAddressService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Post()
  async handle(@ValidatedBody() body: CreateAssociationAddressDTO, @GetUser() user: User): Promise<AddressDTO> {
    const payload = { ...body, associationId: user.associationId.toValue() };
    const result = await this.transactionManager.run(() => this.useCase.execute(payload));

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AddressMapper.toDTO(result);
  }
}
