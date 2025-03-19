import { Module } from '@nestjs/common';
import { FindUserByIdModule } from './findUserById/findUserById.module';
import { DeleteUserModule } from './deleteUser/deleteUser.module';
import { ListUsersByAssociationModule } from './listUsersByAssociation/listUsersByAssociation.module';
import { UpdateUserModule } from './updateUser/updateUser.module';

@Module({
  imports: [FindUserByIdModule, DeleteUserModule, ListUsersByAssociationModule, UpdateUserModule],
})
export class UserModule {}
