import { Injectable } from '@nestjs/common';
import { IMealMongoDbRepository } from './IMeal-mongodb.repository';
import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { MealModel } from '../../bds/mongodb/schema/mealModel';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';

@Injectable()
export class MealMongoDbRepository implements IMealMongoDbRepository {
  async create(meal: CreateMealDto): Promise<Meal> {
    const createdMeal = await MealModel.create({ ...meal });

    await createdMeal.save();

    return createdMeal;
  }

  async findById(id: string): Promise<Meal> {
    const meal = await MealModel.findById(id);

    return meal;
  }

  async update(id: string, payload: UpdateMealDto): Promise<Meal> {
    const updatedMeal = await MealModel.findByIdAndUpdate(
      id,
      {
        name: payload.name,
        description: payload.description,
        on_diet: payload.on_diet,
      },
      { new: true },
    );

    return updatedMeal;
  }
}
