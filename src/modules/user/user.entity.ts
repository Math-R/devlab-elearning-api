import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn, OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { File } from '../files/file.entity';
import { Profiler } from 'inspector';
import { PasswordTransformer } from '../utils/password.transformer';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    select: false,
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => File, file => file.user)
  files: File[];
}
