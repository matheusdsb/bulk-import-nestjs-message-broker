import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoadUsersService } from '../../domain/use-cases/load-users/load-users.service';
import { ImportFilter } from '../../domain/models/import-filter';
@Controller('load-users')
export class LoadUsersController {
  constructor(private readonly loadUsersService: LoadUsersService) {}

  @MessagePattern('load-users')
  async loadUsers(@Payload() data: ImportFilter): Promise<void> {
    await this.loadUsersService.sendUsersForSaving(data);
  }
}
