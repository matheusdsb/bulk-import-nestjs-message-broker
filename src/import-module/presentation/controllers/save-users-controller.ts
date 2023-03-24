import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SaveUserService } from '../../domain/use-cases/save-users/save-user.service';
import { UserModel } from '../../domain/models/user-model';

@Controller('save-users')
export class SaveUsersController {
  constructor(private readonly saveUserService: SaveUserService) {}

  @MessagePattern('save-user')
  async saveUser(@Payload() data: UserModel): Promise<void> {
    await this.saveUserService.save(data);
  }
}
