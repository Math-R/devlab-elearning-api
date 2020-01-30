import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { getConnection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateCourseValidator } from './validator/CreateCourseValidator';
import slugify from 'slugify';
import { FileService } from '../file/file.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private userService: UserService,
    private fileService: FileService,
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

  async store(coursePayload: CreateCourseValidator) {
    const course: Course = new Course();
    course.title = coursePayload.title;
    course.slug = slugify(coursePayload.title);
    course.description = coursePayload.description;
    course.estimatedTime = coursePayload.estimatedTime;
    await coursePayload.files.forEach((e, i, course)  => {
      // this.fileService.find(e.id).then(e => {
      //   getConnection()
      //     .createQueryBuilder()
      //     .relation(Course, 'files')
      //     .of(course)
      //     .add(e);
      // });

    });
    await course.save();
  }
}
