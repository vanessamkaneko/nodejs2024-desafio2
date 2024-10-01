import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';

export interface IMealMongoDbRepository {
  create(meal: CreateMealDto): Promise<Meal>;
  findById(id: string): Promise<Meal>;
  update(id: string, payload: UpdateMealDto): Promise<Meal>;
}

export const IMealMongoDbRepository = Symbol('IMealMongoDbRepository');
