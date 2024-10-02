import { Inject } from '@nestjs/common';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { GetMealUseCase } from 'src/core/meal/usecase/get-meal/get-meal.usecase';

export class GetMealController {
  constructor(
    @Inject(GetMealUseCase)
    private getMealUseCase: GetMealUseCase,
  ) {}

  async handle(id: string): Promise<Meal> {
    const meal = await this.getMealUseCase.execute(id);

    return meal;
  }
}
