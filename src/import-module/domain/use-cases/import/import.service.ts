import { Inject, Injectable, Logger } from '@nestjs/common';
import { ImportFilter } from '../../models/import-filter';
import { MessageBrokerError } from '../../models/message-broker-error';
import { LoadUsersBroker } from './ports/load-users-broker';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);

  constructor(
    @Inject('LoadUsersBroker')
    private readonly loadUsersBrokerClient: LoadUsersBroker,
  ) {}

  async startImporting(importFilter: ImportFilter): Promise<void> {
    try {
      await this.loadUsersBrokerClient.send(importFilter);
    } catch (error) {
      const customErrorMessage = 'error sending message to start loading users';
      this.logger.error(`${customErrorMessage}: ${error.message}`, error.stack);
      throw new MessageBrokerError(customErrorMessage, error);
    }
  }
}
