import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateAddressDTO } from './dto/updateAddress.dto';
import { UpdateAddressService } from './updateAddress.service';

import User from '@/module/user/domain/user/user.domain';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/address')
@ApiTags('address')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateAddressController {
  constructor(private readonly useCase: UpdateAddressService) {}

  @Put('/:id')
  async handle(@ValidatedBody() body: UpdateAddressDTO, @GetUser() user: User): Promise<UpdateResponseDTO> {
    const payload = { ...body, associationId: user.associationId.toValue() };
    const result = await this.useCase.execute(payload);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
