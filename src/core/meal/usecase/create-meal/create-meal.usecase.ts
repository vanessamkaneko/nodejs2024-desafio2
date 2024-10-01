import { Inject, Injectable } from '@nestjs/common';
import { CreateMealDto } from '../../dto/create-meal.dto';
import { Meal } from '../../entity/meal.entity';
import { IMealGateway } from 'src/application/operation/gateway/meal/IMealGateway';

@Injectable()
export class CreateMealUseCase {
  constructor(
    @Inject(IMealGateway)
    private mealGateway: IMealGateway,
  ) {}

  async execute(meal: CreateMealDto): Promise<Meal> {
    // const { description, name, on_diet } = meal;

    // if (!description || !name || on_diet === undefined) {
    //   throw new BadRequestException(
    //     'Meal description, name and on_diet are required!',
    //   );
    // }

    const newMeal = Meal.new(meal);

    const createdMeal = await this.mealGateway.createMeal(newMeal);

    return createdMeal;
  }
}
