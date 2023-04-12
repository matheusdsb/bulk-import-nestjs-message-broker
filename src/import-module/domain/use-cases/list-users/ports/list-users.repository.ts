import { User } from '../../../entities/user';
import { Page } from '../page';

export interface ListUsersRepository {
  findManyAndCount(
    maxItems?: number,
    idGreaterThan?: number,
  ): Promise<Page<User>>;
}
