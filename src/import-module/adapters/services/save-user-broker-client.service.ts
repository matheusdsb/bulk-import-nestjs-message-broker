import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { MessageBrokerError } from '../../domain/models/message-broker-error';
import { UserModel } from '../../domain/models/user-model';
import { SaveUserBroker } from '../../domain/use-cases/load-users/ports/save-user-broker';

export class SaveUserBrokerClient implements SaveUserBroker {
  constructor(
    @Inject('import-users-service') private readonly clientProxy: ClientKafka,
  ) {}

  send(data: UserModel): void {
    try {
      this.clientProxy.send<any, UserModel>('save-user', data).subscribe();
    } catch (error) {
      throw new MessageBrokerError(
        `error sending message to save user: ${error.message}`,
        error,
      );
    }
  }
}
