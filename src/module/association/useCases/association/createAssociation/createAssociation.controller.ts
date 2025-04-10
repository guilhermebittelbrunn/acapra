import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateAssociationService } from './createAssociation.service';
import { CreateAssociationDTO } from './dto/createAssociation.dto';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import { AssociationDTO } from '@/module/association/dto/association.dto';
import AssociationMapper from '@/module/association/mappers/association.mapper';
import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';

@Controller('/association')
@ApiTags('association')
export class CreateAssociationController {
  constructor(
    private readonly useCase: CreateAssociationService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Post()
  async handle(@ValidatedBody() body: CreateAssociationDTO): Promise<AssociationDTO> {
    const result = await this.transactionManager.run(() => this.useCase.execute(body));

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return AssociationMapper.toDTO(result);
  }
}
