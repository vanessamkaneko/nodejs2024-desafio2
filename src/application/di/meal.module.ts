import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { IMealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/IMeal-mongodb.repository';
import { MealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/Meal-mongodb.repository';
import { IMealGateway } from '../operation/gateway/meal/IMealGateway';
import { MealGateway } from '../operation/gateway/meal/MealGateway';
import { CreateMealUseCase } from 'src/core/meal/usecase/create-meal/create-meal.usecase';
import { CreateMealController } from '../operation/controller/meal/create-meal/create-meal.controller';
import { MealControllerRoute } from '../api/http-rest/routes/meal.route';
import { UpdateMealUseCase } from 'src/core/meal/usecase/update-meal/update-meal.usecase';
import { UpdateMealController } from '../operation/controller/meal/update-meal/update-meal.controller';

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
