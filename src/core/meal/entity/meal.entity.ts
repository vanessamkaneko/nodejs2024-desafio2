import { CreateMealDto } from '../dto/create-meal.dto';

export class Meal {
  name: string;

  description: string;

  on_diet: boolean;

  date: Date; // será igual ao created_at => mongo cria automático (??)

  private constructor(meal: CreateMealDto) {
    this.name = meal.name;
    this.description = meal.description;
    this.on_diet = meal.on_diet;
  }

  public static new(payload: CreateMealDto) {
    const meal = new Meal(payload);
    return meal;
  }
}
