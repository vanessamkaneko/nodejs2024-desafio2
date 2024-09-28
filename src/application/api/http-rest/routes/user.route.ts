import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserController } from 'src/application/operation/controller/user/create-user/create-user.controller';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';

@Controller('/user')
export class UserControllerRoute {
  constructor(private createUserController: CreateUserController) {}

  @Post('/create')
  async create(@Body() user: CreateUserDto): Promise<User> {
    const createUser = await this.createUserController.handle(user);
    return createUser;
  }
}
