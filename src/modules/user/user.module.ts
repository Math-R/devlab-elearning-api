import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdminController } from './user.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UserAdminController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {
}
