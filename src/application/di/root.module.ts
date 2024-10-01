import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { APP_FILTER } from '@nestjs/core';
import { MongoDbService } from 'src/infrastructure/persistence/bds/mongodb/MongoDb.service';
import { UserModule } from './user.module';
import { MealModule } from './meal.module';

@Module({
  imports: [UserModule, MealModule, ConfigModule.forRoot()],
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
