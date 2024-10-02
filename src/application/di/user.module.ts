import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { UserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/User-mongodb.repository';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/IUser-mongodb.repository';
import { UserControllerRoute } from '../api/http-rest/routes/user.route';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';
import { UserGateway } from '../operation/gateway/user/UserGateway';
import { CreateUserUseCase } from 'src/core/user/usecase/create-user/create-user.usecase';
import { CreateUserController } from '../operation/controller/user/create-user/create-user.controller';
import { IMealGateway } from '../operation/gateway/meal/IMealGateway';
import { ListUserMealsUseCase } from 'src/core/user/usecase/list-user-meals/list-user-meals.usecase';
import { ListUserMealsController } from '../operation/controller/user/list-user-meals/list-user-meals.controller';
import { MealGateway } from '../operation/gateway/meal/MealGateway';
import { IMealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/IMeal-mongodb.repository';
import { MealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/Meal-mongodb.repository';

const persistenceProviders: Provider[] = [
  {
    provide: IUserMongoDbRepository,
    useFactory: () => new UserMongoDbRepository(),
    inject: [],
  },
  {
    provide: IMealMongoDbRepository,
    useFactory: () => new MealMongoDbRepository(),
    inject: [],
  },
  {
    provide: IUserGateway,
    useFactory: (userMongoDbRepository: IUserMongoDbRepository) =>
      new UserGateway(userMongoDbRepository),
    inject: [IUserMongoDbRepository],
  },
  {
    provide: IMealGateway,
    useFactory: (mealMongoDbRepository: IMealMongoDbRepository) =>
      new MealGateway(mealMongoDbRepository),
    inject: [IMealMongoDbRepository],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new CreateUserUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: ListUserMealsUseCase,
    useFactory: (mealGateway: IMealGateway) =>
      new ListUserMealsUseCase(mealGateway),
    inject: [IMealGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CreateUserController,
    useFactory: (createUserUseCase: CreateUserUseCase) =>
      new CreateUserController(createUserUseCase),
    inject: [CreateUserUseCase],
  },
  {
    provide: ListUserMealsController,
    useFactory: (listUserMealsUseCase: ListUserMealsUseCase) =>
      new ListUserMealsController(listUserMealsUseCase),
    inject: [ListUserMealsUseCase],
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
