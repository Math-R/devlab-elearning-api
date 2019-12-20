import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from './user.entity';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterPayload } from '../auth/validator/register.payload';
import { CreateUserValidator, UserEditValidator } from './validator/UserValidator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }
  async index() {
    return this.userRepository.find({
      cache: true,
    });
  }

  async findUsername(username: string, relation = []) {
    return this.userRepository.findOne({
      where: { username },
      relations: relation,
    });
  }

  async findId(id: number, relation?: [string]) {
    return this.userRepository.findOne({ where: { id }, relations : relation });
  }

  async findEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async register(payload: CreateUserValidator) {
    const user = await this.findUsername(payload.username);
    if (user) {
      throw new NotAcceptableException(
        'User with provided username already created.',
      );
    }
    const userEmail = await this.findEmail(payload.email);
    if (userEmail) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }
    const userModel = new User();
    userModel.email = payload.email;
    userModel.username = payload.username;
    userModel.description = payload.description ? payload.description : null;
    userModel.password = payload.password;
    await userModel.save();
    return userModel;
  }

  async update(user: User, payload: UserEditValidator) {
    if (user.username !== payload.username) {
      const alreadyUser = await this.findUsername(payload.username);
      if (alreadyUser) {
        throw new NotAcceptableException(
          'A user already have username ' + payload.username,
        );
      }
    }

    if (user.email !== payload.email) {
      const alreadyUser = await this.findEmail(payload.email);
      if (alreadyUser) {
        throw new NotAcceptableException(
          'A user already have  email ' + payload.email,
        );
      }
    }

    user.username = payload.username;
    user.email = payload.email;
    user.description = payload.description;
    await user.save();
    return user;
  }

  async delete(user: User) {
    return this.userRepository.remove(user);
  }

  notFound() {
    return {
      message: 'User Not Found',
    };
  }

}
