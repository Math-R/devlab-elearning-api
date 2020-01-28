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
import { Chapter } from '../chapter/chapter.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'courses',
})
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ nullable: true })
  estimatedTime: number;

  @OneToMany(type => Chapter, chapter => chapter.course)
  chapters: Chapter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => File, file => file.course)
  files: File[];




}
