import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';

export interface IMealGateway {
  createMeal(meal: CreateMealDto): Promise<Meal>;
  findMealById(id: string): Promise<Meal>;
  updateMeal(id: string, payload: UpdateMealDto): Promise<Meal>;
}

export const IMealGateway = Symbol('IMealGateway');
