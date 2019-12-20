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
import { Level } from '../level/level.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @OneToOne(type => Level, {eager : true})
  @JoinColumn()
  level: Level;

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
