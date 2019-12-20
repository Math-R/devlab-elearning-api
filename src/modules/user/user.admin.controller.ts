import { Body, Controller, Get, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRessource } from './user.ressource';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from '../utils/guard/IsAdmin.guard';
import { UserEditValidator } from './validator/UserEditValidator';
import { CreateUserValidator } from './validator/UserValidator';

@ApiUseTags('admin/users')
@Controller('admin/users')
export class UserAdminController {

  constructor(private userService: UserService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Get('')
  async index(@Res()  res) {
    const users = await this.userService.index(['level', 'files']);
    return res.send({ data: UserRessource.collection(users) });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post('create')
  async create(@Res()  res, @Body() body: CreateUserValidator) {
    const users = await this.userService.index(['level', 'files']);
    return res.send({ data: UserRessource.collection(users) });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Put('edit')
  async edit(@Res()  res, @Body() body: UserEditValidator) {
    const users = await this.userService.index(['level', 'files']);
    return res.send({ data: UserRessource.collection(users) });
  }
}
