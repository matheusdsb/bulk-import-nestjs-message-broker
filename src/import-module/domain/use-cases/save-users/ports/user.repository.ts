import { User } from '../../../entities/user';

export interface UserRepository {
  findById(id: number): Promise<User>;
  updateMany(users: User[]): Promise<void>;
  insertMany(users: User[]): Promise<void>;
}
