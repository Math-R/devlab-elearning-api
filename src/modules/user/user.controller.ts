import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRessource } from './user.ressource';
import { UserService } from './user.service';

@ApiUseTags('users')
@Controller('users')
export class UserController {

  constructor(private userService: UserService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Res() res, @Req() request) {
    // const user = await this.userService.findId(request.user);
    return res.send({
      data: UserRessource.toArray(request.user),
    });
  }
}
