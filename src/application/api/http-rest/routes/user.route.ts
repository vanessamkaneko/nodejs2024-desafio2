import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateUserController } from 'src/application/operation/controller/user/create-user/create-user.controller';
import { ListUserMealsController } from 'src/application/operation/controller/user/list-user-meals/list-user-meals.controller';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';

@Controller('/user')
export class UserControllerRoute {
  constructor(
    private createUserController: CreateUserController,
    private listUserMealsController: ListUserMealsController,
  ) {}

  @Post('/create')
  async create(
    @Body() user: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const createUser = await this.createUserController.handle(user);
    session.userId = createUser._id;
    return createUser;
  }

  @Get('/meals')
  async list(@Session() session: any): Promise<Meal[]> {
    const listUserMeals = await this.listUserMealsController.handle(
      session.userId,
    );
    return listUserMeals;
  }
}
