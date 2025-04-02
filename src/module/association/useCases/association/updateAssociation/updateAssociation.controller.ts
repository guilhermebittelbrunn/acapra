import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateAssociationDTO } from './dto/updateAssociation.dto';
import { UpdateAssociationService } from './updateAssociation.service';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/association')
@ApiTags('association')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateAssociationController {
  constructor(
    private readonly useCase: UpdateAssociationService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Put('/:id')
  async handle(
    @ValidatedBody() body: UpdateAssociationDTO,
    @Param('id') associationId: string,
  ): Promise<UpdateResponseDTO> {
    const result = await this.transactionManager.run(() =>
      this.useCase.execute({ ...body, id: associationId }),
    );

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
