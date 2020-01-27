import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { getConnection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private userService: UserService,
  ) {
  }

  async all() {
    return await this.courseRepository.find();
  }

  async find(slug: string) {
    return await this.courseRepository.findOne({ where: slug });

  }

  async assignCourseTo(course: Course, id: number) {
    const user = await this.userService.findId(id);
    return await getConnection()
      .createQueryBuilder()
      .relation(User, 'courses')
      .of(user)
      .add(course);
  }
}
