import { Module } from '@nestjs/common';
import { DeleteSpecieService } from './deleteSpecie.service';
import { DeleteSpecieController } from './deleteSpecie.controller';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';

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
