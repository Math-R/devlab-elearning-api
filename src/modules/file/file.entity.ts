import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';

@Entity({
  name: 'files',
})
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5000 })
  file: string;

  @Column({ length: 1000, nullable: true })
  slug: string | null;

  @Column()
  type: string;

  @Column()
  name: string;

  @ManyToOne(type => User, user => user.files)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ManyToOne(type => Course, course => course.files)
  @JoinColumn({ name: 'fk_course_id' })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
