import { Module } from '@nestjs/common';

import { FindSpecieByIdController } from './findSpecieById.controller';
import { FindSpecieByIdService } from './findSpecieById.service';

import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  controllers: [FindSpecieByIdController],
  providers: [
    FindSpecieByIdService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class FindSpecieByIdModule {}
