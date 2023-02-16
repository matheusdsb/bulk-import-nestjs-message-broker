import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ImportModule } from './import-module/import.module';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_ENDPOINT), ImportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
