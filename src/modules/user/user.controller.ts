import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UserController {

  @Get('')
  async index(@Res()  res) {
    return res.send({
      status: 'running',
    });
  }
}
