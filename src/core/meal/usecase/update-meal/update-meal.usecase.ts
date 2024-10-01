import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMealGateway } from 'src/application/operation/gateway/meal/IMealGateway';
import { UpdateMealDto } from '../../dto/update-meal.dto';
import { Meal } from '../../entity/meal.entity';

@Injectable()
export class UpdateMealUseCase {
  constructor(
    @Inject(IMealGateway)
    private mealGateway: IMealGateway,
  ) {}

  async execute(id: string, payload: UpdateMealDto): Promise<Meal> {
    const meal = await this.mealGateway.findMealById(id);

    if (!meal) {
      throw new BadRequestException('Meal not found!');
    }

    const updateMeal = await this.mealGateway.updateMeal(id, payload);

    return updateMeal;
  }
}
