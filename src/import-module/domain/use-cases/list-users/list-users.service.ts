import { Inject, Injectable } from '@nestjs/common';
import { ListUsersRepository } from './ports/list-users.repository';
import { ListUsersFilter } from '../../models/list-users-filter';
import { Page } from './page';
import { User } from '../../entities/user';

@Injectable()
export class ListUsersService {
  private readonly MAX_ITEMS = 100;

  constructor(
    @Inject('ListUsersRepository')
    private readonly listUsersRepository: ListUsersRepository,
  ) {}

  async list(filter: ListUsersFilter): Promise<Page<User>> {
    return this.listUsersRepository.findManyAndCount(
      filter.maxItems && filter.maxItems < this.MAX_ITEMS
        ? filter.maxItems
        : this.MAX_ITEMS,
      filter.idGreaterThan,
    );
  }
}
