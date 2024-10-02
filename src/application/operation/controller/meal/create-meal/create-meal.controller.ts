import { Inject } from '@nestjs/common';
import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { CreateMealUseCase } from 'src/core/meal/usecase/create-meal/create-meal.usecase';

export class CreateMealController {
  constructor(
    @Inject(CreateMealUseCase)
    private createMealUseCase: CreateMealUseCase,
  ) {}

  async handle(meal: CreateMealDto, userId: string): Promise<Meal> {
    const createMeal = await this.createMealUseCase.execute(meal, userId);

    return createMeal;
  }
}
