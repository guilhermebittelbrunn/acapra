import { Module } from '@nestjs/common';

import { DeleteUserModule } from './deleteUser/deleteUser.module';
import { FindUserByIdModule } from './findUserById/findUserById.module';
import { ListUsersByAssociationModule } from './listUsersByAssociation/listUsersByAssociation.module';
import { UpdateUserModule } from './updateUser/updateUser.module';

@Module({
  imports: [FindUserByIdModule, DeleteUserModule, ListUsersByAssociationModule, UpdateUserModule],
})
export class UserModule {}
