import { Module } from '@nestjs/common';

import { DeleteSpecieController } from './deleteSpecie.controller';
import { DeleteSpecieService } from './deleteSpecie.service';

import { SpecieRepository } from '@/repositories/prisma/specie.repository';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';

@Module({
  controllers: [DeleteSpecieController],
  providers: [
    DeleteSpecieService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class DeleteSpecieModule {}
