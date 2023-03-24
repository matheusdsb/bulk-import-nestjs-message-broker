import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { ImportModule } from './import-module/import.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_ENDPOINT),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/import-module/domain/models/graphql.ts'),
        outputAs: 'class',
      },
    }),
    ImportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
