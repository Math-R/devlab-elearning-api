import { Controller, Get, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('admin')
@Controller('admin')
export class AdminController {
  @Get()
  async admin() {

  }
}
