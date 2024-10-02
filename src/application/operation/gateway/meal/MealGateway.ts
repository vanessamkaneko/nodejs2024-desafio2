import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { IMealGateway } from './IMealGateway';
import { IMealMongoDbRepository } from 'src/infrastructure/persistence/repositories/meal/IMeal-mongodb.repository';
import { Inject } from '@nestjs/common';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';

export class MealGateway implements IMealGateway {
  constructor(
    @Inject(IMealMongoDbRepository)
    private mealRepository: IMealMongoDbRepository,
  ) {}

  async createMeal(meal: CreateMealDto): Promise<Meal> {
    const createMeal = await this.mealRepository.create(meal);

    return createMeal;
  }

  async findMealById(id: string): Promise<Meal | null> {
    const meal = await this.mealRepository.findById(id);

    return meal;
  }

  async findByUserId(userId: string): Promise<Meal[]> {
    const meals = await this.mealRepository.findByUserId(userId);

    return meals;
  }

  async updateMeal(id: string, payload: UpdateMealDto): Promise<Meal> {
    const updateMeal = await this.mealRepository.update(id, payload);

    return updateMeal;
  }

  async deleteMeal(id: string): Promise<void> {
    const deleteMeal = await this.mealRepository.delete(id);

    return deleteMeal;
  }
}
