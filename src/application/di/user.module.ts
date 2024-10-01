import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { UserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/User-mongodb.repository';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/IUser-mongodb.repository';
import { UserControllerRoute } from '../api/http-rest/routes/user.route';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';
import { UserGateway } from '../operation/gateway/user/UserGateway';
import { CreateUserUseCase } from 'src/core/user/usecase/create-user/create-user.usecase';
import { CreateUserController } from '../operation/controller/user/create-user/create-user.controller';

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

const useCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new CreateUserUseCase(userGateway),
    inject: [IUserGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CreateUserController,
    useFactory: (createUserUseCase: CreateUserUseCase) =>
      new CreateUserController(createUserUseCase),
    inject: [CreateUserUseCase],
  },
];

@Module({
  imports: [],
  controllers: [UserControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class UserModule {}
