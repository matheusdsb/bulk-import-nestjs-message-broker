import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { DatabaseError } from '../../models/database-error';
import { UserRepository } from './ports/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(users: User[]): Promise<void> {
    try {
      await this.userRepository.insertMany(users);
    } catch (error) {
      throw new DatabaseError('error inserting users', error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new DatabaseError('error listing user by id', error);
    }
  }

  async update(users: User[]): Promise<void> {
    try {
      await this.userRepository.updateMany(users);
    } catch (error) {
      throw new DatabaseError('error updating users', error);
    }
  }
}
