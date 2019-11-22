import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  controllers: [AdminController, UserController],
  imports: [UserModule],
  exports: [UserModule],
})
export class AdminModule {
}
