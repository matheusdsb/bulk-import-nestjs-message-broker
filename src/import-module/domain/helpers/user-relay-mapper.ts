import { Page } from '../use-cases/list-users/page';
import { PageInfo, User, UserEdge, UserRelay } from '../models/graphql';

export class UserRelayMapper {
  static fromPage(page: Page<User>): UserRelay {
    const relay = new UserRelay();
    relay.pageInfo = this.mountPageInfo(page);
    relay.edges = this.mountEdges(page);
    return relay;
  }

  private static mountPageInfo(page: Page<User>): PageInfo {
    const pageInfo = new PageInfo();
    pageInfo.hasNextPage = page.hasNextPage;
    return pageInfo;
  }

  private static mountEdges(page: Page<User>): UserEdge[] {
    const edges = [];
    for (const item of page.items) {
      const edge = this.mountEdge(item);
      edges.push(edge);
    }
    return edges;
  }

  private static mountEdge(user: User): UserEdge {
    const edge = new UserEdge();
    edge.cursor = user.id;
    edge.node = user;
    return edge;
  }
}
