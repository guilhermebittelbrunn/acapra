import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateAssociationService } from './updateAssociation.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { UpdateAssociationDTO } from './dto/updateAssociation.dto';
import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import { UpdateResponseDTO } from '@/shared/types/common';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/association')
@ApiTags('association')
@UseGuards(JwtAuthGuard)
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
    const id = await this.transactionManager.run(() => this.useCase.execute({ ...body, id: associationId }));
    return { id };
  }
}
