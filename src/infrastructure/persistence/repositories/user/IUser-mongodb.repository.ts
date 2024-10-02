import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';

export interface IUserMongoDbRepository {
  create(user: CreateUserDto): Promise<User>;
  findById(userId: string): Promise<User>;
}

export const IUserMongoDbRepository = Symbol('IUserMongoDbRepository');
