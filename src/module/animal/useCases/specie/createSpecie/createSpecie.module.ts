import { Module } from '@nestjs/common';
import { CreateSpecieService } from './createSpecie.service';
import { CreateSpecieController } from './createSpecie.controller';
import { ISpecieRepositorySymbol } from '@/repositories/specie.repository.interface';
import { SpecieRepository } from '@/repositories/prisma/specie.repository';

@Module({
  controllers: [CreateSpecieController],
  providers: [
    CreateSpecieService,
    {
      provide: ISpecieRepositorySymbol,
      useClass: SpecieRepository,
    },
  ],
})
export class CreateSpecieModule {}
