import { Controller, Post } from '@nestjs/common';
import { CreateAssociationService } from './createAssociation.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { CreateAssociationDTO } from './dto/createAssociation.dto';
import { AssociationDTO } from '@/module/association/dto/association.dto';
import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import AssociationMapper from '@/module/association/mappers/association.mapper';

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

    return AssociationMapper.toDTO(result);
  }
}
