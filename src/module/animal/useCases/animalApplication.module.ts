import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';

@Module({
  imports: [SpecieModule],
})
export class AnimalApplicationModule {}
