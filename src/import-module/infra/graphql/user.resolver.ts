import { Args, Query, Resolver } from '@nestjs/graphql';
import { RelayArguments } from '../../domain/models/graphql';
import { ListUsersService } from '../../domain/use-cases/list-users/list-users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Query('users')
  async getPaginatedlist(@Args('') args: RelayArguments) {
    return this.listUsersService.list(args);
  }
}
