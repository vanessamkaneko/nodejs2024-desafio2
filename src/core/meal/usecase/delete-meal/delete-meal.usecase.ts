import { BadRequestException, Inject } from '@nestjs/common';
import { IMealGateway } from 'src/application/operation/gateway/meal/IMealGateway';

export class DeleteMealUseCase {
  constructor(
    @Inject(IMealGateway)
    private mealGateway: IMealGateway,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const meal = await this.mealGateway.findMealById(id);

    if (!meal) {
      throw new BadRequestException('Meal not found!');
    }

    if (meal.userId !== userId) {
      throw new BadRequestException(
        'You do not have permission to delete this meal!',
      );
    }

    const deleteMeal = await this.mealGateway.deleteMeal(id);

    return deleteMeal;
  }
}
