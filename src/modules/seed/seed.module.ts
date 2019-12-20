import { Logger, Module } from '@nestjs/common';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';
import { Level } from '../level/level.entity';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Level]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService, Logger],
})
export class SeedModule {
}
