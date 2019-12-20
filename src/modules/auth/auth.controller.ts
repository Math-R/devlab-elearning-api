import { Body, Controller, Get, NotAcceptableException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginPayload } from './validator/login.payload';
import { RegisterPayload } from './validator/register.payload';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserValidator } from '../user/validator/UserValidator';

@Controller('auth')
@ApiUseTags('authentication')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Res() res, @Body() body: LoginPayload): Promise<any> {
    if (!body.email || !body.password) {
      throw new NotAcceptableException('Wrong Payload');
    }
    const user = await this.userService.findEmail(body.email);
    console.log(user);
    if (!user) {
      throw new NotAcceptableException('No user found for email ' + body.email);
    }
    const token = await this.authService.login(user);

    return res.send({
      data: [
        user,
        token,
      ],
    });
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Res() res, @Body() body: RegisterPayload): Promise<any> {
    const user = await this.userService.register(body);
    const token = await this.authService.login(user);
    delete user.password;
    const result = { user, token };
    return res.send({
      data: result,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedUser(@Res() res, @Req() request): Promise<any> {
    return res.send({ data: request.user });
  }
}
