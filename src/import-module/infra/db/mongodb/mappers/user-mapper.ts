import { UserMongoModel } from '../schemas/user-schema';
import { User } from '../../../../domain/entities/user';

export class UserMapper {
  static fromMongoModel(model: UserMongoModel): User {
    if (model) {
      const user = new User();

      user.login = model.login;
      user.id = model._id;
      user.avatar = model.avatar;
      user.isAdmin = model.isAdmin;

      return user;
    }

    return null;
  }
}
