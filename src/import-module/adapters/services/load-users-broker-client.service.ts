import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { LoadUsersBroker } from '../../domain/use-cases/import/ports/load-users-broker';
import { ImportFilter } from '../../domain/models/import-filter';

export class LoadUsersBrokerClient implements LoadUsersBroker {
  constructor(
    @Inject('import-users-service') private readonly clientProxy: ClientKafka,
  ) {}

  async send(data: ImportFilter): Promise<void> {
    this.clientProxy.send('load-users', data).subscribe();
  }
}
