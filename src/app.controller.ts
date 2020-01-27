import { Controller, Get, Logger, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ConfigService } from './modules/config/config.service';
import { getConnection } from 'typeorm';

@ApiUseTags('api')
@Controller('')
export class AppController {
  private logger: Logger = new Logger('AppController');

  constructor(private configService: ConfigService) {
  }

  @Get('migrate')
  async runMigration(@Res() res, @Req() req) {
    const { token } = req.query;
    if (token !== this.configService.get('DB_TOKEN')) {
      throw new UnauthorizedException('Wrong Token combination!');
    }
    const migration = await getConnection().runMigrations();
    this.logger.debug('Successfuly completed migration...');
    return res.send({
      message: 'Migration done',
    });
  }

  @Get('sync')
  async runSynchronize(@Res() res, @Req() req) {
    const { token } = req.query;
    if (token !== this.configService.get('DB_TOKEN')) {
      throw new UnauthorizedException('Wrong Token combination!');
    }
    const sync = await getConnection().synchronize();
    this.logger.debug('Successfuly completed synchronize...');
    return res.send({
      message: 'Migration done',
    });
  }

}
