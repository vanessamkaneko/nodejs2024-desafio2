import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMealGateway } from 'src/application/operation/gateway/meal/IMealGateway';
import { Meal } from '../../entity/meal.entity';

@Injectable()
export class GetMealUseCase {
  constructor(
    @Inject(IMealGateway)
    private mealGateway: IMealGateway,
  ) {}

  async execute(id: string): Promise<Meal> {
    const meal = await this.mealGateway.findMealById(id);

    if (!meal) {
      throw new BadRequestException('Meal not found!');
    }

    return meal;
  }
}
