import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CreateMealUseCase } from 'src/core/meal/usecase/create-meal/create-meal.usecase';
import { DeleteMealUseCase } from 'src/core/meal/usecase/delete-meal/delete-meal.usecase';
import { GetMealUseCase } from 'src/core/meal/usecase/get-meal/get-meal.usecase';
import { UpdateMealUseCase } from 'src/core/meal/usecase/update-meal/update-meal.usecase';
import { CurrentUserInterceptor } from 'src/core/user/interceptor/current-user.interceptor';
import { IMealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/IMeal-mongodb.repository';
import { MealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/Meal-mongodb.repository';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/IUser-mongodb.repository';
import { UserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/User-mongodb.repository';
import { MealControllerRoute } from '../api/http-rest/routes/meal.route';
import { CreateMealController } from '../operation/controller/meal/create-meal/create-meal.controller';
import { DeleteMealController } from '../operation/controller/meal/delete-meal/delete-meal.controller';
import { GetMealController } from '../operation/controller/meal/get-meal/get-meal.controller';
import { UpdateMealController } from '../operation/controller/meal/update-meal/update-meal.controller';
import { IMealGateway } from '../operation/gateway/meal/IMealGateway';
import { MealGateway } from '../operation/gateway/meal/MealGateway';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';
import { UserGateway } from '../operation/gateway/user/UserGateway';
import { CurrentUserMiddleware } from 'src/core/user/middlewares/current-user.middleware';

const persistenceProviders: Provider[] = [
  {
    provide: IMealMongoDbRepository,
    useFactory: () => new MealMongoDbRepository(),
    inject: [],
  },
  {
    provide: IMealGateway,
    useFactory: (mealMongoDbRepository: IMealMongoDbRepository) =>
      new MealGateway(mealMongoDbRepository),
    inject: [IMealMongoDbRepository],
  },
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
  {
    provide: CurrentUserInterceptor,
    useFactory: (userGateway: IUserGateway) =>
      new CurrentUserInterceptor(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: CurrentUserMiddleware,
    useFactory: (userGateway: IUserGateway) =>
      new CurrentUserMiddleware(userGateway),
    inject: [IUserGateway],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateMealUseCase,
    useFactory: (mealGateway: IMealGateway) =>
      new CreateMealUseCase(mealGateway),
    inject: [IMealGateway],
  },
  {
    provide: UpdateMealUseCase,
    useFactory: (mealGateway: IMealGateway) =>
      new UpdateMealUseCase(mealGateway),
    inject: [IMealGateway],
  },
  {
    provide: DeleteMealUseCase,
    useFactory: (mealGateway: IMealGateway) =>
      new DeleteMealUseCase(mealGateway),
    inject: [IMealGateway],
  },
  {
    provide: GetMealUseCase,
    useFactory: (mealGateway: IMealGateway) => new GetMealUseCase(mealGateway),
    inject: [IMealGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CreateMealController,
    useFactory: (createMealUseCase: CreateMealUseCase) =>
      new CreateMealController(createMealUseCase),
    inject: [CreateMealUseCase],
  },
  {
    provide: UpdateMealController,
    useFactory: (updateMealUseCase: UpdateMealUseCase) =>
      new UpdateMealController(updateMealUseCase),
    inject: [UpdateMealUseCase],
  },
  {
    provide: DeleteMealController,
    useFactory: (deleteMealUseCase: DeleteMealUseCase) =>
      new DeleteMealController(deleteMealUseCase),
    inject: [DeleteMealUseCase],
  },
  {
    provide: GetMealController,
    useFactory: (getMealUseCase: GetMealUseCase) =>
      new GetMealController(getMealUseCase),
    inject: [GetMealUseCase],
  },
];

@Module({
  imports: [],
  controllers: [MealControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class MealModule {}
