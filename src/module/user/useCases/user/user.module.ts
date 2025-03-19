import { Module } from '@nestjs/common';
import { FindUserByIdModule } from './findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
})
export class UserModule {}
