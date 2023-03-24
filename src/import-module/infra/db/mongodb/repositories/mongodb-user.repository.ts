import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../../../domain/use-cases/save-users/ports/user.repository';
import { UserDocument } from '../schemas/user-schema';
import { UserMapper } from '../mappers/user-mapper';
import { User } from '../../../../domain/entities/user';
import { UserMongoModelMapper } from '../mappers/user-mongo-model-mapper';
@Injectable()
export class MongoDBUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findById(id: number): Promise<User> {
    const model = await this.userModel.findById(id).exec();
    return model?.id ? UserMapper.fromMongoModel(model) : null;
  }

  async updateMany(users: User[]): Promise<void> {
    const models = users.map((c) => UserMongoModelMapper.fromUser(c));
    for (const model of models) {
      await this.userModel.updateOne(
        { _id: model._id },
        {
          login: model.login,
          avatar: model.avatar,
          isAdmin: model.isAdmin,
        },
      );
    }
  }

  async insertMany(users: User[]): Promise<void> {
    const models = users.map((c) => UserMongoModelMapper.fromUser(c));
    await this.userModel.insertMany(models);
  }
}
