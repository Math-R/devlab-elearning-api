import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRessource } from './user.ressource';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from '../utils/guard/IsAdmin.guard';

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
}
