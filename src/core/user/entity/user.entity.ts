import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  name: string;

  email: string;

  private constructor(payload: CreateUserDto) {
    this.name = payload.name;
    this.email = payload.email;
  }

  public static new(payload: CreateUserDto) {
    const user = new User(payload);
    return user;
  }
}
