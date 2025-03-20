import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';
import { BreedModule } from './breed/breed.module';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [SpecieModule, BreedModule, AnimalModule],
})
export class AnimalApplicationModule {}
