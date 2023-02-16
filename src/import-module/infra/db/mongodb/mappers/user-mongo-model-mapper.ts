import { User } from '../../../../domain/entities/user';
import { UserMongoModel } from '../schemas/user-schema';

export class UserMongoModelMapper {
  static fromUser(user: User): UserMongoModel {
    if (user) {
      const model = new UserMongoModel();

      model._id = user.id;
      model.login = user.login;
      model.avatar = user.avatar;
      model.isAdmin = user.isAdmin;

      return model;
    }

    return null;
  }
}
