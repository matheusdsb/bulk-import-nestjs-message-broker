import { ImportFilter } from '../../../models/import-filter';
import { UserModel } from '../../../models/user-model';

export interface ListUsersService {
  list(filter: ImportFilter): Promise<UserModel[]>;
}
