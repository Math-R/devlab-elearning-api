import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [UserModule, AuthModule, AdminModule],
  exports: [UserModule, AuthModule, AdminModule],
})
export class AppModule {
}
