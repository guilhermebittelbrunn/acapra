import { Module } from '@nestjs/common';

import { ListSpeciesBaseModule } from './listSpeciesBase/listSpeciesBase.module';

@Module({
  imports: [ListSpeciesBaseModule],
})
export default class SpecieBaseModule {}
