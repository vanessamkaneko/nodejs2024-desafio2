import { Inject } from '@nestjs/common';
import { IUserGateway } from './IUserGateway';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/IUser-mongodb.repository';

export class UserGateway implements IUserGateway {
  constructor(
    @Inject(IUserMongoDbRepository)
    private userRepository: IUserMongoDbRepository,
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
