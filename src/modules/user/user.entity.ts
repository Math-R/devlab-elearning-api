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

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @ManyToOne(type => Level, level => level.users)
  @JoinColumn()
  level: Level;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ length: 255 })
  email: string;

  @Column({default : 0})
  admin: boolean;

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
