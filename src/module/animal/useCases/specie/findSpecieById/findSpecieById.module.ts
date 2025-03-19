import { Module } from '@nestjs/common';
import { FindSpecieByIdService } from './findSpecieById.service';
import { FindSpecieByIdController } from './findSpecieById.controller';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';

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
