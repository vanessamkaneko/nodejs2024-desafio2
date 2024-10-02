import { CreateMealDto } from '../dto/create-meal.dto';

export class Meal {
  name: string;

  description: string;

  on_diet: boolean;

  date: Date; // será igual ao created_at => mongo cria automático (??)

  userId: string;

  private constructor(meal: CreateMealDto, userId: string) {
    this.name = meal.name;
    this.description = meal.description;
    this.on_diet = meal.on_diet;
    this.userId = userId;
  }

  public static new(payload: CreateMealDto, userId: string) {
    const meal = new Meal(payload, userId);
    return meal;
  }
}
