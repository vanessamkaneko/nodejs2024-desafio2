import { Injectable } from '@nestjs/common';
import { IUserMongoDbRepository } from './IUser-mongodb.repository';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import { UserModel } from '../../bds/mongodb/schema/userModel';

@Injectable()
export class UserMongoDbRepository implements IUserMongoDbRepository {
  async findById(userId: string): Promise<User> {
    const user = await UserModel.findById(userId);
    return user;
  }
  async create(user: CreateUserDto): Promise<User> {
    const createdUser = await UserModel.create({ ...user });

    return createdUser;
  }
}
