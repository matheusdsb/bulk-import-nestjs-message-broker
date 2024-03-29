import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { SaveUserService } from '../../domain/use-cases/save-users/save-user.service';
import { UserModel } from '../../domain/models/user-model';

@Controller('save-users')
export class SaveUsersController {
  constructor(
    private readonly saveUserService: SaveUserService,
    @Inject('import-users-service') private readonly clientKafka: ClientKafka,
  ) {}

  @MessagePattern('save-user')
  async saveUser(@Payload() data: UserModel): Promise<void> {
    await this.saveUserService.save(data);
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('save-user');
    await this.clientKafka.connect();
  }
}
