import { Inject, Injectable } from '@nestjs/common';
import { IMealGateway } from 'src/application/operation/gateway/meal/IMealGateway';
import { Meal } from 'src/core/meal/entity/meal.entity';

@Injectable()
export class ListUserMealsUseCase {
  constructor(
    @Inject(IMealGateway)
    private mealGateway: IMealGateway,
  ) {}

  async execute(userId: string): Promise<Meal[]> {
    const listedMeals = await this.mealGateway.findByUserId(userId);
    return listedMeals;
  }
}
