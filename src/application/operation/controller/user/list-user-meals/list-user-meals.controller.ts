import { Inject } from '@nestjs/common';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { ListUserMealsUseCase } from 'src/core/user/usecase/list-user-meals/list-user-meals.usecase';

export class ListUserMealsController {
  constructor(
    @Inject(ListUserMealsUseCase)
    private listUserMealsUseCase: ListUserMealsUseCase,
  ) {}

  async handle(userId: string): Promise<Meal[]> {
    const meals = await this.listUserMealsUseCase.execute(userId);
    return meals;
  }
}
