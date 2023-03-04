import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { LoadUsersService } from '../../domain/use-cases/load-users/load-users.service';
import { ImportFilter } from '../../domain/models/import-filter';
import * as dotenv from 'dotenv';

dotenv.config();
@Controller('load-users')
export class LoadUsersController implements OnModuleInit {
  constructor(
    private readonly loadUsersService: LoadUsersService,
    @Inject('import-users-service') private readonly clientKafka: ClientKafka,
  ) {}

  @MessagePattern('load-users')
  async loadUsers(@Payload() data: ImportFilter): Promise<void> {
    await this.loadUsersService.sendUsersForSaving(data);
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('load-users');
    await this.clientKafka.connect();
  }
}
