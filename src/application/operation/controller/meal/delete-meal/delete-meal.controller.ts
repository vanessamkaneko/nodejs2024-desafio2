import { Inject } from '@nestjs/common';
import { DeleteMealUseCase } from 'src/core/meal/usecase/delete-meal/delete-meal.usecase';

export class DeleteMealController {
  constructor(
    @Inject(DeleteMealUseCase)
    private deleteMealUseCase: DeleteMealUseCase,
  ) {}

  async handle(id: string): Promise<void> {
    const deleteMeal = await this.deleteMealUseCase.execute(id);

    return deleteMeal;
  }
}
