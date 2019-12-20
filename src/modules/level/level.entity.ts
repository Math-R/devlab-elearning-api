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

@Entity({
  name: 'cms_levels',
})
export class Level extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000, nullable: true })
  slug: string | null;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
