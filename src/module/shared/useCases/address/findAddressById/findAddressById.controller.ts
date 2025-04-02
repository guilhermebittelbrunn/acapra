import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindAddressByIdService } from './findAddressById.service';

import { AddressDTO } from '@/module/shared/dto/address.dto';
import AddressMapper from '@/module/shared/mappers/address.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';

@Controller('/address')
@ApiTags('address')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class FindAddressByIdController {
  constructor(private readonly useCase: FindAddressByIdService) {}

  @Get('/:id')
  async handle(@Param('id') addressId: string): Promise<AddressDTO> {
    const result = await this.useCase.execute(addressId);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AddressMapper.toDTO(result);
  }
}
