import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ListUsersService } from '../../domain/use-cases/load-users/ports/list-users.service';
import { UserModel } from '../../domain/models/user-model';
import { ImportFilter } from '../../domain/models/import-filter';

export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  site_admin: boolean;
};

@Injectable()
export class GitHubUserService implements ListUsersService {
  // API REFERENCE https://docs.github.com/pt/rest/reference/users
  private logger = new Logger(GitHubUserService.name);
  static MAX_PAGE_SIZE = 100;

  constructor(
    private httpService: HttpService,
    @Inject('GITHUB_USERS_API') private apiUrl: string,
  ) {}

  async list(filter: ImportFilter): Promise<UserModel[]> {
    try {
      const idGreaterThan = filter.idGreaterThan ? filter.idGreaterThan : 0;
      const pageSize =
        filter.maxItems && filter.maxItems < GitHubUserService.MAX_PAGE_SIZE
          ? filter.maxItems
          : GitHubUserService.MAX_PAGE_SIZE;

      const result = await this.httpService.axiosRef.get<GithubUser[]>(
        `${this.apiUrl}?since=${idGreaterThan}&per_page=${pageSize}`,
      );
      return result?.data ? this.toUserModels(result.data) : [];
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new Error('Error consuming Github Users API');
    }
  }

  private toUserModels(githubUsers: GithubUser[]): UserModel[] {
    return githubUsers.map((g) => ({
      id: g.id,
      login: g.login,
      avatar: g.avatar_url,
      isAdmin: g.site_admin,
    }));
  }
}
