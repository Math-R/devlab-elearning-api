import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn, OneToMany, ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { File } from '../file/file.entity';
import { Profiler } from 'inspector';
import { PasswordTransformer } from '../utils/password.transformer';
import { Level } from '../level/level.entity';
import { Course } from '../course/course.entity';

@Entity({
  name: 'chapters',
})
export class Chapter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(type => Course, course => course.chapters)
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => File)
  @JoinColumn()
  file: File;

}
