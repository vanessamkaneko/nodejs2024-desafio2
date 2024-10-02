import { Meal } from 'src/core/meal/entity/meal.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  _id?: string;
  name: string;

  email: string;

  meals?: Meal[];

  private constructor(payload: CreateUserDto) {
    this.name = payload.name;
    this.email = payload.email;
  }

  public static new(payload: CreateUserDto) {
    const user = new User(payload);
    return user;
  }
}
