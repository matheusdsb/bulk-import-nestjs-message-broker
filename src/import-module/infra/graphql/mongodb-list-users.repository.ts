import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from '../../domain/use-cases/list-users/page';
import { ListUsersRepository } from '../../domain/use-cases/list-users/ports/list-users.repository';
import { User } from '../../domain/entities/user';
import {
  UserDocument,
  UserMongoModel,
} from '../db/mongodb/schemas/user-schema';

@Injectable()
export class MongoDBListUsersRepository implements ListUsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findManyAndCount(
    maxItems?: number,
    idGreaterThan?: number,
  ): Promise<Page<User>> {
    const filter = idGreaterThan
      ? {
          _id: {
            $gt: idGreaterThan,
          },
        }
      : null;
    const count = await this.userModel.countDocuments(filter).exec();
    const models = await this.userModel
      .find(filter)
      .limit(maxItems)
      .sort({ _id: 'ascending' })
      .exec();
    const items = models.map((i) =>
      MongoDBListUsersRepository.fromMongoModel(i),
    );
    return new Page<User>(items, count, maxItems);
  }

  private static fromMongoModel(model: UserMongoModel): User {
    if (model) {
      const user = new User();

      user.id = model._id;
      user.login = model.login;
      user.avatar = model.avatar;
      user.isAdmin = model.isAdmin;

      return user;
    }

    return null;
  }
}
