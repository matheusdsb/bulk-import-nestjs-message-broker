import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user';
import { UserModel } from '../../models/user-model';

@Injectable()
export class SaveUserService {
  private readonly logger = new Logger(SaveUserService.name);

  constructor(private readonly userService: UserService) {}

  async save(userModel: UserModel): Promise<void> {
    try {
      const user = SaveUserService.fromModel(userModel);
      const existingItem = await this.userService.findOne(user.id);

      if (existingItem) {
        await this.update(user);
      } else {
        await this.create(user);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  private async create(user: User): Promise<void> {
    await this.userService.create([user]);
  }

  private async update(user: User): Promise<void> {
    await this.userService.update([user]);
  }

  private static fromModel(model: UserModel): User {
    if (model) {
      const user = new User();

      user.id = model.id;
      user.login = model.login;
      user.avatar = model.avatar;
      user.isAdmin = model.isAdmin;

      return user;
    }
    return null;
  }
}
