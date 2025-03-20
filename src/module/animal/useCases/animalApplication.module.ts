import { Module } from '@nestjs/common';

import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './breed/breed.module';
import { SpecieModule } from './specie/specie.module';

@Module({
  imports: [SpecieModule, BreedModule, AnimalModule],
})
export class AnimalApplicationModule {}
