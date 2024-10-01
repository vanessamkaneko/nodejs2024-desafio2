import { Inject } from '@nestjs/common';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { UpdateMealUseCase } from 'src/core/meal/usecase/update-meal/update-meal.usecase';

export class UpdateMealController {
  constructor(
    @Inject(UpdateMealUseCase)
    private updateMealUseCase: UpdateMealUseCase,
  ) {}

  async handle(id: string, payload: UpdateMealDto): Promise<Meal> {
    const updateMeal = await this.updateMealUseCase.execute(id, payload);

    return updateMeal;
  }
}
