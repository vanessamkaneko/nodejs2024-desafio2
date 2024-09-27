import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { APP_FILTER } from '@nestjs/core';
import { TaskModule } from './task.module';
import { MongoDbService } from 'src/infrastructure/persistence/bds/mongodb/MongoDb.service';

@Module({
  imports: [TaskModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    MongoDbService,
  ],
})
export class RootModule {}
