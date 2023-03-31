import { Inject, Injectable, Logger } from '@nestjs/common';
import { ImportFilter } from '../../models/import-filter';
import { ListUsersService } from './ports/list-users.service';
import { UserModel } from '../../models/user-model';
import { TimerHelper } from '../../helpers/timer.helper';
import { SaveUserBroker } from './ports/save-user-broker';

@Injectable()
export class LoadUsersService {
  private readonly logger = new Logger(LoadUsersService.name);
  private static MAX_CALLS_USERS_API = 49;

  constructor(
    @Inject('ListUsersService')
    private readonly listUsersService: ListUsersService,
    @Inject('SaveUserBroker')
    private readonly saveUserBrokerClient: SaveUserBroker,
  ) {}

  async sendUsersForSaving(filter: ImportFilter): Promise<void> {
    try {
      let remainingItems = filter.maxItems || 0;
      let users = await this.listUsersService.list(filter);
      let remainingCalls = LoadUsersService.MAX_CALLS_USERS_API;

      while (users.length > 0 && remainingItems > 0 && remainingCalls > 0) {
        await this.sendBatch(users);
        const lastFetchedId = this.getLastIdFrom(users);

        if (lastFetchedId < 0) {
          break;
        }

        remainingItems = remainingItems - users.length;
        users = await this.fetchNextPage(lastFetchedId, remainingItems);

        remainingCalls--;
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  private async sendBatch(users: UserModel[]): Promise<void> {
    for (const user of users) {
      await this.saveUserBrokerClient.send(user);
    }
  }

  private getLastIdFrom(users: UserModel[]): number {
    const lastIndex = users.length - 1;
    return lastIndex >= 0 ? users[lastIndex].id : -1;
  }

  private async fetchNextPage(
    lastFetchedId: number,
    remainingItems: number,
  ): Promise<UserModel[]> {
    await TimerHelper.sleep(2000);

    return this.listUsersService.list({
      idGreaterThan: lastFetchedId,
      maxItems: remainingItems,
    });
  }
}
