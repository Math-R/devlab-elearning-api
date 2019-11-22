import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  @Get('/login')
  async login() {

  }
}
