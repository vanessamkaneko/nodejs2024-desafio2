import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongoDbService } from 'src/infrastructure/persistence/bds/mongodb/MongoDb.service';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { MealModule } from './meal.module';
import { UserModule } from './user.module';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';
import { UserGateway } from '../operation/gateway/user/UserGateway';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/IUser-mongodb.repository';
import { UserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/User-mongodb.repository';

const persistenceProviders: Provider[] = [
  {
    provide: IUserMongoDbRepository,
    useFactory: () => new UserMongoDbRepository(),
    inject: [],
  },
  {
    provide: IUserGateway,
    useFactory: (userMongoDbRepository: IUserMongoDbRepository) =>
      new UserGateway(userMongoDbRepository),
    inject: [IUserMongoDbRepository],
  },
];

@Module({
  imports: [UserModule, MealModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    ...persistenceProviders,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    MongoDbService,
  ],
})
export class RootModule {}
