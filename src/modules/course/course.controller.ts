import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRessource } from '../user/user.ressource';
import { CourseService } from './course.service';
import { UserService } from '../user/user.service';

@ApiUseTags('course')
@Controller('course')
export class CourseController {

  constructor(private courseService : CourseService, private userService: UserService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async index(@Res() res, @Req() request) {
    const courses = await this.courseService.all();
    return res.send({
      data: courses,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async one(@Res() res, @Req() request, @Param() params) {
    const course = await this.courseService.find(params.id);
    return res.send({
      data: course,
    });
  }



  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('choose/:id')
  async choose(@Res() res, @Req() request, @Param() params) {
    const course = await this.courseService.find(params.id);
    await this.courseService.assignCourseTo(course, request.user.id);
    const courses = await this.userService.getCurrent(request);
    return res.send({
      data: courses,
    });
  }



}
