import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';

export interface IUserGateway {
  createUser(user: CreateUserDto): Promise<User>;
}

export const IUserGateway = Symbol('IUserGateway');
