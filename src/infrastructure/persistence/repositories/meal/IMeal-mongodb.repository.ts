import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';

export interface IMealMongoDbRepository {
  create(meal: CreateMealDto): Promise<Meal>;
  findById(id: string): Promise<Meal | null>;
  update(id: string, payload: UpdateMealDto): Promise<Meal>;
  delete(id: string): Promise<void>;
  findByUserId(userId: string): Promise<Meal[]>;
}

export const IMealMongoDbRepository = Symbol('IMealMongoDbRepository');
