import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';
import { BreedModule } from './breed/breed.module';

@Module({
  imports: [SpecieModule, BreedModule],
})
export class AnimalApplicationModule {}
