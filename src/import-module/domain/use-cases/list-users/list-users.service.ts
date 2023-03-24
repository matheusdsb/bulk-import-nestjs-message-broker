import { Inject, Injectable } from '@nestjs/common';
import { RelayArguments, UserRelay } from '../../models/graphql';
import { UserRelayMapper } from '../../helpers/user-relay-mapper';
import { ListUsersRepository } from './ports/list-users.repository';

@Injectable()
export class ListUsersService {
  private readonly MAX_ITEMS = 100;

  constructor(
    @Inject('ListUsersRepository')
    private readonly listUsersRepository: ListUsersRepository,
  ) {}

  async list(args: RelayArguments): Promise<UserRelay> {
    const page = await this.listUsersRepository.findManyAndCount(
      args.first && args.first < this.MAX_ITEMS ? args.first : this.MAX_ITEMS,
      parseInt(args.after),
    );
    return UserRelayMapper.fromPage(page);
  }
}
