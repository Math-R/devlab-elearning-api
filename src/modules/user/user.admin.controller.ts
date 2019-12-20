import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('admin/users')
@Controller('admin/users')
export class UserAdminController {

  @Get('')
  async index(@Res()  res) {
    return res.send({
      role: 'admin',
      status: 'running',
    });
  }
}
