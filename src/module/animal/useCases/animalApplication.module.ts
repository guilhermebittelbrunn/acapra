import { Module } from '@nestjs/common';

import { AnimalModule } from './animal/animal.module';
import { SpecieModule } from './specie/specie.module';
import SpecieBaseModule from './specieBase/specieBase.module';

@Module({
  imports: [SpecieModule, AnimalModule, SpecieBaseModule],
})
export class AnimalApplicationModule {}
