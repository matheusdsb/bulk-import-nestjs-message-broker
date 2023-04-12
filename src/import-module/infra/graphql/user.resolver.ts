import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  RelayArguments,
  User as GraphqlUser,
} from '../../domain/models/graphql';
import { ListUsersService } from '../../domain/use-cases/list-users/list-users.service';
import { UserRelayMapper } from '../../domain/helpers/user-relay-mapper';
import { User } from 'src/import-module/domain/entities/user';
import { Page } from '../../domain/use-cases/list-users/page';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Query('users')
  async getPaginatedlist(@Args('') args: RelayArguments) {
    const userPage = await this.listUsersService.list({
      maxItems: args.first,
      idGreaterThan: parseInt(args.after),
    });
    const page = this.toGraphqlUserPage(userPage);
    return UserRelayMapper.fromPage(page);
  }

  private toGraphqlUserPage(userPage: Page<User>): Page<GraphqlUser> {
    const graphqlUsers = userPage.items.map((u) => this.toGraphqlUser(u));
    return new Page<GraphqlUser>(
      graphqlUsers,
      userPage.totalItems,
      userPage.pageSize,
    );
  }

  private toGraphqlUser(user: User): GraphqlUser {
    const graphqlUser = new GraphqlUser();
    graphqlUser.id = user.id.toString();
    graphqlUser.login = user.login;
    graphqlUser.avatar = user.avatar;
    graphqlUser.isAdmin = user.isAdmin;
    return graphqlUser;
  }
}
