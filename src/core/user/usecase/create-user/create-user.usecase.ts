import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entity/user.entity';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(user: CreateUserDto): Promise<User> {
    // if (!user.name || !user.email) {
    //   throw new BadRequestException('Name and email are required!');
    // }

    const newUser = User.new(user);

    const userCreated = this.userGateway.createUser(newUser);

    return userCreated;
  }
}
