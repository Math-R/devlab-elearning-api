import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('admin/users')
@Controller('users')
export class UserController {
  @Get()
  async ok() {

  }
}
