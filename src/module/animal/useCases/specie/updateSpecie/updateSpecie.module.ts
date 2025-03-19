import { Module } from '@nestjs/common';
import { UpdateSpecieService } from './updateSpecie.service';
import { UpdateSpecieController } from './updateSpecie.controller';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';

@Module({
  controllers: [UpdateSpecieController],
  providers: [
    UpdateSpecieService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class UpdateSpecieModule {}
