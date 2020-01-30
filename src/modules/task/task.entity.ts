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
import { Chapter } from '../chapter/chapter.entity';

@Entity({
  name: 'tasks',
})
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Chapter, chapter => chapter.tasks)
  @JoinColumn({ name: 'fk_chapter_id' })
  chapter: Chapter;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
