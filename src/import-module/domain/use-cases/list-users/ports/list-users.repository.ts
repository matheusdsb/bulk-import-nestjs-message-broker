import { User } from '../../../models/graphql';
import { Page } from '../page';

export interface ListUsersRepository {
  findManyAndCount(
    maxItems?: number,
    idGreaterThan?: number,
  ): Promise<Page<User>>;
}
