import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ImportService } from './domain/use-cases/import/import.service';
import { ImportController } from './presentation/controllers/import.controller';
import { MongoDBUserRepository } from './infra/db/mongodb/repositories/mongodb-user.repository';
import { UserSchema } from './infra/db/mongodb/schemas/user-schema';
import { UserService } from './domain/use-cases/save-users/user.service';
import { LoadUsersController } from './presentation/controllers/load-users.controller';
import { SaveUsersController } from './presentation/controllers/save-users-controller';
import { LoadUsersBrokerClient } from './adapters/services/load-users-broker-client.service';
import { SaveUserBrokerClient } from './adapters/services/save-user-broker-client.service';
import { LoadUsersService } from './domain/use-cases/load-users/load-users.service';
import { SaveUserService } from './domain/use-cases/save-users/save-user.service';
import { GitHubUserService } from './adapters/services/github-users.service';
import { User } from './domain/entities/user';

dotenv.config();

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        name: process.env.MESSAGE_BROKER_NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.MESSAGE_CLIENT_ID,
            brokers: [process.env.MESSAGE_BROKER_URL],
          },
          consumer: {
            groupId: process.env.MESSAGE_CONSUMER,
          },
        },
      },
    ]),
  ],
  controllers: [ImportController, LoadUsersController, SaveUsersController],
  providers: [
    ImportService,
    UserService,
    LoadUsersService,
    SaveUserService,
    {
      provide: 'UserRepository',
      useClass: MongoDBUserRepository,
    },
    {
      provide: 'LoadUsersBroker',
      useClass: LoadUsersBrokerClient,
    },
    {
      provide: 'SaveUserBroker',
      useClass: SaveUserBrokerClient,
    },
    {
      provide: 'ListUsersService',
      useClass: GitHubUserService,
    },
    { provide: 'GITHUB_USERS_API', useValue: process.env.GITHUB_USERS_API },
    {
      provide: 'MESSAGE_BROKER_CLIENT',
      useValue: process.env.MESSAGE_BROKER_NAME,
    },
  ],
})
export class ImportModule {}
