import { FileFieldsInterceptor } from '@nest-lab/fastify-multer';
import { File } from '@nest-lab/fastify-multer';
import { Controller, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateAnimalDTO } from './dto/updateAnimal.dto';
import { UpdateAnimalService } from './updateAnimal.service';

import GenericAppError from '@/shared/core/logic/GenericAppError';
import { GenericException } from '@/shared/core/logic/GenericException';
import { ValidatedBody, ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UserRoleGuard } from '@/shared/guards/userRole.guard';
import { FileValidatorInterceptor } from '@/shared/interceptors/fileValidator/fileValidator.interceptor';
import { UpdateResponseDTO } from '@/shared/types/common';
import { MAX_ANIMAL_PICTURES } from '@/shared/utils/consts';

@Controller('/animal')
@ApiTags('animal')
@UseGuards(JwtAuthGuard, UserRoleGuard)
export class UpdateAnimalController {
  constructor(private readonly useCase: UpdateAnimalService) {}

  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: MAX_ANIMAL_PICTURES }]),
    FileValidatorInterceptor,
  )
  async handle(
    @ValidatedBody() body: UpdateAnimalDTO,
    @ValidatedParams('id') animalId: string,
    @UploadedFiles()
    files: { images?: File[] },
  ): Promise<UpdateResponseDTO> {
    const payload = { ...body, id: animalId, ...files };
    const result = await this.useCase.execute(payload);

    if (result instanceof GenericAppError) {
      throw new GenericException(result);
    }

    return { id: result };
  }
}
